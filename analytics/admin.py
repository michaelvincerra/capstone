from django.contrib import admin
from .models import Country, EconomicSnapshot, Collection


# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin


admin.site.register(Country)
admin.site.register(EconomicSnapshot)
admin.site.register(Collection)