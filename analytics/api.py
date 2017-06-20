from rest_framework import viewsets
from .serializers import EconomicSnapshotSerializer
from .models import EconomicSnapshot


class EconomicSnapshotViewSet(viewsets.ModelViewSet):
    model = EconomicSnapshot
    queryset = EconomicSnapshot.objects.all()
    serializer_class = EconomicSnapshotSerializer