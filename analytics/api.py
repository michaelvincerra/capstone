from rest_framework import viewsets
from .serializers import EconomicSnapshotSerializer
from .models import EconomicSnapshot, Country
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime




class EconomicSnapshotViewSet(viewsets.ModelViewSet):
    model = EconomicSnapshot
    queryset = EconomicSnapshot.objects.all()
    serializer_class = EconomicSnapshotSerializer




@api_view(['GET'])
def render_custom_chart(request):
    """
    Returns 1 chart, with countries compared and with a user-selected date range.

    """

    countries = request.GET.get('countries').split(',')
    start_date = int(request.GET.get('start_date'))
    end_date = int(request.GET.get('end_date'))
    years = range(start_date, end_date+1)

    # TODO: Deal with collections of varying lengths

    data = list()

    for country in countries:
        comparison = EconomicSnapshot.objects.filter(country__slug=country, year__in=years)

        for indicator_code in ('FDI', 'GNI', 'GDP', 'IP'):                 # TODO: fix
            snapshots = comparison.filter(type=indicator_code)

            dataset = {es.year: es.value for es in snapshots}
            dataset.update({"total": "42", "code": f'{indicator_code}'})  # TODO: Finish this!! How is indicator_code used?
            data.append(dataset)


    columns = [{"type": "object", "name": "year", "order": "0"}, ]  # {"type": "object", "name": "year", "order": "0"}
    [columns.append({"type": "float64", "name": year, "order": abs(start_date-year)}) for year in years]
    columns.append({"type": "float64", "name": "total", "order": abs(start_date-end_date) + 1})

    chart_data = {'data': data, 'columns': columns}

    metadata = {'countries': countries,
                'count': len(countries),
                'query_time': str(datetime.now())}

    response_fields = {'status': "success",
                       'metadata': metadata,
                       'results': chart_data}


    return Response(response_fields, status=status.HTTP_200_OK)