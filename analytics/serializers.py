from rest_framework import serializers
from .models import EconomicSnapshot, Country, Collection



class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('name', 'code', 'flag', 'id',)   # Added: 06/26/2017


class EconomicSnapshotSerializer(serializers.ModelSerializer):
    country = CountrySerializer()
    class Meta:
        model = EconomicSnapshot
        fields = ('year', 'country', 'type', 'value', 'description','source_url', 'id',)   # 'slug', removed: 06.20.2017


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ('title', 'updated', 'slides')  # Added 07.12.17