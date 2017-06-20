from django.core.management.base import BaseCommand, CommandError
from analytics.models import EconomicSnapshot as Indicators
# from polls.models import Question as Poll

class Command(BaseCommand):
    help = 'Downloads data on economic indicators.'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):

            # indicators.save()

            self.stdout.write(self.style.SUCCESS(f'Successfully downloaded {indicators_id}'))
