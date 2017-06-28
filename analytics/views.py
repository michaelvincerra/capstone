from django.shortcuts import render, redirect
from .models import EconomicSnapshot, Country
from collections import OrderedDict
from django.db.models import Max


def home(request):
    """
    Landing page template view
    """
    return render(request, 'home.html')

# def about(request):
#     """
#     Landing page template view
#     """
#     return render(request, 'about.html')
#
# def login(request):
#     """
#     Landing page template view
#     """
#     return render(request, 'login.html')
#
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

    # countries = sorted(Country.objects.all(), key=lambda c: c.name)
    # https://stackoverflow.com/questions/844591/how-to-do-select-max-in-django

    selection = Country.objects.get(slug=country.lower())
    latest_year = selection.snapshots.all().aggregate(Max('year'))['year__max']
    chart_data = list(selection.snapshots.filter(year=latest_year).values_list('value', flat=True))

    composite = set(EconomicSnapshot.objects.all().values_list('country__name', 'type', 'country__flag'))
    countries = sorted(Country.objects.all(), key=lambda c: c.name)

    indicators = OrderedDict()

    for snapshot in composite:
        indicator = snapshot[1]
        try:
            indicators[indicator].append(snapshot)
        except KeyError:
            indicators[indicator] = [snapshot]  # Def by negation: Finds first instance of loop variable, then repeats.

    # selection = [(name, sorted(data)) for name, data in indicators.items()]

    context = {'chart_data': chart_data,
                'selection': selection,
               'countries': countries,
               'indicators': indicators,
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


def delete(request):
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