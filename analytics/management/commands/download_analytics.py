from django.core.management.base import BaseCommand, CommandError
import requests
from analytics.models import EconomicSnapshot, Country
# import locale
# locale.setlocale(locale.LC_ALL, 'en_CA.UTF-8')

class Command(BaseCommand):
    help = 'Downloads data on economic indicators.'

    def add_arguments(self, parser):    # Helper function that enables admin to enter options at command line.
        parser.add_argument('iso_code', type=str, help="Country desired for data.")
        parser.add_argument('start_year', type=int)
        parser.add_argument('end_year', type=int)
        # parser.add_argument('indicators', type=str, help=self.indicators_help)

    def handle(self, *args, **options):
            indicator_prompt = '''
            IP  --> BX.GSR.ROYL.CD | Intellectual property sales and receipts
            GDP --> NY.GDP.MKTP.CD | Gross Domestic Product
            GNI --> NY.GNP.ATLS.CD | Gross National Income 
            FDI --> BN.KLT.DINV.CD | Foreign direct investment
            '''

            print(indicator_prompt)
            print("Enter the type of economic indicator you want.", sep='')

            answer = input('>> ')

            indicators = {'IP': 'BX.GSR.ROYL.CD',
                          'GDP': 'NY.GDP.MKTP.CD',
                          'GNI': 'NY.GNP.ATLS.CD',
                          'FDI': 'BN.KLT.DINV.CD'}

            try:
                indicator = indicators[answer.upper()]
            except KeyError:
                print("No such choice")
                exit(-1)

            url = f'http://api.worldbank.org/countries/{options["iso_code"]}/indicators/{indicator}'      # URL string from WorldBank API; options allows admin to insert two-digit ISO country code in URL
            start, end = options['start_year'], options['end_year']                                      # Via **options param, adds start_year and and end_year to command line
            request_params = {'format': 'json',                                                          # makes response json for further parsing
                              'per_page': '500',                                                         # sets per_page, per API, as 500 max. Note: Most 'pages' of country data are 1-5.
                              'date': f'{start}:{end}'}                                                  # incorporates user-defined date range in download
                              # 'MRV': '500',
                              # 'Gapfill': 'Y',
                              # 'Frequency': 'Y'}



            response = requests.get(url, params=request_params)                                          # sets response method to get
            # metadata = not response.json()  # How to know to separate the metadata and "result"?
            # results = response.json()
            try:
                metadata, results = response.json()                                                          # How to know to separate the metadata and "result"?
            except ValueError:
                print(f'{response.json()}')
                exit()

            counter, skipped, total = 0, 0, 0                                                            # sets counter, skipped, total at 0 to view null, or skipped values
            for result in results:                                                                       # for loop captures above values during download to report them
                if result['value'] is None:
                    skipped += 1
                    total += 1
                    continue

                # Ref: https://docs.djangoproject.com/en/1.11ref/models/querysets/#get-or-create
                country, created = Country.objects.get_or_create(name=result['country']['value'],
                                       code = result['country']['id'],
                                        )
                if created:
                    country.save()

                # Inside FOR LOOP, describes Model EconomicSnapshot, giving shape to its return result using API params.
                indicator = EconomicSnapshot(year=int(result['date']),
                                            country=country,
                                            type=answer,
                                            description=result['indicator']['value'],
                                            value=result['value'],
                                            source_url=url,)


                indicator.save()     # saves record to the sqlite3 database
                print(indicator)     # prints results of indicator
                counter += 1
                total += 1

            message = f'Successfully downloaded {counter} records and skipped {skipped} with total of {total}.'

            self.stdout.write(self.style.SUCCESS(message))    # proxy for console output on success of handle function.



""" 
# Reference: Writing Custom Django Commands 
# https://docs.djangoproject.com/en/1.11/howto/custom-management-commands/
"""