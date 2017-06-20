from rest_framework import serializers
from .models import EconomicSnapshot


class EconomicSnapshotSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EconomicSnapshot
        fields = ('id', 'name', 'type', 'created',)   # 'slug', removed: 06/20/2017
