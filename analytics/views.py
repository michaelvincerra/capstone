from django.shortcuts import render, redirect
from .models import EconomicSnapshot, Country, Collection
from collections import OrderedDict
from django.db.models import Max
# from accounts.models import User

def home(request):
    """
    Landing page template view
    """
    return render(request, 'home.html')

def about(request):
    """
    Explanation of purpose, background.
    """
    return render(request, 'about.html')

# def gallery(request):
#     """
#     Returns gallery page of sample charts.
#     """
#     return render(request, 'gallery.html')


# def contact(request):
#     """
#     Landing page template view
#     """
#     return render(request, 'contact.html')


def list_economic_snapshots(request, country, type):    # country_code,
    """
    Returns 1 country page with default economic indicator selected.
    """
    # country_code = EconomicSnapshot.objects.filter(country_code=country_code.upper(),)

    # https://stackoverflow.com/questions/844591/how-to-do-select-max-in-django

    selection = Country.objects.get(slug=country.lower())
    latest_year = selection.snapshots.all().aggregate(Max('year'))['year__max']
    # all_years = selection.snapshots.all().aggregate('year')
    chart_data = list(selection.snapshots.filter(year=latest_year).values())    # changed from from values_list to values(): need a dictionary.

    composite = set(EconomicSnapshot.objects.all().values_list('country__name', 'type', 'country__flag'))
    countries = sorted(Country.objects.all(), key=lambda c: c.name)

    indicators = OrderedDict()

    for snapshot in composite:
        indicator = snapshot[1].lower()
        try:
            indicators[indicator].append(snapshot)
        except KeyError:
            indicators[indicator] = [snapshot]  # Def by negation: Finds first instance of loop variable, then repeats.

    # selection = [(name, sorted(data)) for name, data in indicators.items()]

    context = {'chart_data': chart_data,
               'selection': selection,
               'countries': countries,
               'indicators': indicators,
               'latest_year': latest_year,
               'type': type,
               }
    # Key: 'selection'; only changes the param in the template
    return render(request, 'country.html', context)


def list_country_composite(request):
    """
    Returns mastergrid table with 7 countries and their related indicators 
    """
    countries = sorted(Country.objects.all(), key=lambda c: c.name)

    composite = set(EconomicSnapshot.objects.all().values_list('country__name', 'type', 'country__flag'))

    indicators = OrderedDict()

    for snapshot in composite:
        indicator = snapshot[1]
        try:
            indicators[indicator].append(snapshot)
        except KeyError:
            indicators[indicator] = [snapshot]  # Def by negation: Finds first instance of loop variable, then repeats.

    ordered_indicators = [(name, sorted(data)) for name, data in indicators.items()]
    context = {'countries': countries,
               'ordered_indicators': ordered_indicators}  # Key: 'ordered_indicators'; only changes the param in the template

    return render(request, "mastergrid.html", context)

# https://docs.djangoproject.com/en/1.11/ref/models/querysets/#values-list


def make_panini(request, slug):
    """
    CRUDL:LIST. Returns 1 country showing all 4 economic indicators from 1975 2015, or available range of dates.
    View includes a slider bar to select a time range.
    1 dataset shows: country name, country code, type, years-range, and stacked values of IP, GDP, GNI, FDI
    """
    country = Country.objects.get(slug=slug)
    # country = Country.objects.get(slug=slug, start_year=Gstartyear, end_year=Gend_year)
    # economicsnapshot = EconomicSnapshot.objects.get(slug=slug)
    # reordered= selection.snapshots.aggregate(reversed('year'))


    GStart_year = 1975          ## TODO: Recreate GStart_year, GEnd_year values as a variable.
    GEnd_year = 2015

    data, snapshot_ids = list(), list(),
    for indicator_code in ('FDI', 'GNI', 'GDP', 'IP'):
        snapshots = country.snapshots.filter(type=indicator_code)    # reverse fk lookup: snapshots to EconomicSnapshot

        composite = EconomicSnapshot.objects.all().values_list('year', flat=True)
        GStart_year, GEnd_year = min(composite), max(composite)

        range_years = range(GStart_year, GEnd_year+1)

        dataset1 = snapshots.all().filter(year__in=range_years)


        # if(snapshots.year>=GStart_year and snapshots.year<=GEnd_year). Option 2: Use conditional to derive year values.



        dataset = {es.year: es.value for es in dataset1}
        [snapshot_ids.append(s.id) for s in snapshots]
        dataset.update({"total": "42", "store": f'{slug}', "code": country.name})          # TODO: Finish this!! How is indicator_code used?
        data.append(dataset)

    columns = [{"type": "object", "name": "year", "order": "0"}, ]    #{"type": "object", "name": "year", "order": "0"}
    counter = 0
    for es in snapshots:
        # column_data = {"type": "float64", "name": es.year, "order": es.year}
        column_data = {"type": es.type, "name": es.year, "order": es.year}

        columns.append(column_data)
        counter += 1

    chart_data = {'data': data,
                  'columns': columns}

    countries = Country.objects.all().order_by('code')
    context = {'chart_data': chart_data,
               'countries': countries,
               'snapshot_ids': snapshot_ids,
               'GStart_year': GStart_year,
               'GEnd_year': GEnd_year,
               }

    return render(request, "country_panini.html", context)


def collection_gallery(request):
    """

    """

    collections = Collection.objects.all()
    context = {'collections': collections}


    return render(request, "gallery.html", context)


# def make_custom_panini(request, slug):
#     """
#     CRUDL: CREATE
#     Returns 1 country for a user-defined range of years with type (indicators) selected.
#     """
#     # Item.objects.create()
#     #
#     # bracketed = EconomicSnapshot.objects.get()
#     #
#
#
#     # viewfinder =  ...  TODO: Need to learn how to call make_panini and save a custom view from it.
#
#     context = {'chart_custom', chart_custom}
#     return make_panini(request, "customview.html", context)
#     # make_panini()    TODO: Invoke changed view from above?


def create(request):
    """
    Create a user account for creating economic snapshot(s). 
    """
    # if request.method == "GET":
    #     form = MediaModelForm()
    #
    # elif request.method == "POST":
    #     form = MediaModelForm(data=request.POST)
    #     if form.is_valid():
    #         isinstance = form.save(commit=False)
    #         isinstance.save()
    #         return redirect('templates/thanks')
    context = {}
    return render(request,'home.html', context)

def retrieve(request, pk):
    """
    Retrieve a user's saved economic snapshot. 
    """
    economicsnapshot = EconomicSnapshot.objects.get(id=pk)
    context = {'economicsnapshot': economicsnapshot}
    return render(request,'home.html', context)


def update(request, pk):
    """
    Modify an existing user's view or views . 
    """
    # economicsnapshot = EconomicSnapshot.get(id=pk)
    #
    # if request.method == "GET":
    #     form = MediaModelForm(instance=economicsnapshot)
    #
    # elif request.method == "POST":
    #     form = MediaModelForm(instance=economicsnapshot, data=request.POST)
    #     if form.is_valid():
    #         instance = form.save(commit=False)
    #         instance.save()
    #         return redirect('template/thanks')
    #         #This can also be used to send an email to the user.

    context = {}
    return render(request,'home.html', context)


def delete(request, pk):
    """
    Delete user account.
    Delete user's custom economic snapshot. 
    """
    economicsnapshot = EconomicSnapshot.objects.get(id=pk)
    economicsnapshot.delete()

    context = {'status': f'Deleted {economicsnapshot.id}'}
    return render(request, "home.html", context)


def display(request):
    """
    Display a user's custom views. 
    """
    context = {}
    return render(request,'home.html', context)


def thanks(request):
    return render(request, "thanks.html")