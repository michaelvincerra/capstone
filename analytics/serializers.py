from rest_framework import serializers
from .models import EconomicSnapshot


class EconomicSnapshotSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EconomicSnapshot
        fields = ('type', 'year', 'country', 'value', 'description','source_url', 'id',)   # 'slug', removed: 06/20/2017
