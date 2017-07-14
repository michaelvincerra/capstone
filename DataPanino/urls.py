"""DataPanino URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url, include
from django.contrib import admin
from analytics.views import home
from rest_framework import routers
from accounts.api import UserViewSet
from accounts.views import profile, login, logout, register
from analytics.api import EconomicSnapshotViewSet, render_custom_chart, get_country_codes, save_collection
from analytics.views import list_economic_snapshots, list_country_composite, make_panini, about, collection_gallery


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'snapshots', EconomicSnapshotViewSet)

urlpatterns = [

    # Accounts
    url(r'^accounts/', include('accounts.urls', namespace='accounts')),
    # url(r'^accounts/login', login, name='login'),

    # API
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/v1/snapshots/$', render_custom_chart, name='render_custom_chart'),  # This is the callable variable in template tag
    url(r'^api/v1/codes/$', get_country_codes, name='get_country_codes'),
    url(r'^api/v1/collection/save/$', save_collection, name='save_collection'),
    # url(r'^api/v1/', include(router.urls)),

    # Pages
    url(r'^$', home, name='home'),
    url(r'^about$', about, name='about'),
    # url(r'^contact', contact, name='contact'),      # TODO: Complete contact.html page
    url(r'collections/gallery/', collection_gallery, name='gallery'),

    # Analytics
    url(r'^detail/(?P<slug>\w+)/$', home, name='home'),  # URL parameter capturing using a kwarg
    url(r'^country_overview/$', list_country_composite, name='composite'),  # see 'def list_country_composite in views.
    url(r'^country/(?P<country>[\w-]+)/(?P<type>\w{0,5})/$', list_economic_snapshots, name='economic_snapshots'),
    url(r'^country_panini/(?P<slug>[a-zA-Z\-]+)$', make_panini, name='make_panini'),


    # url(r'^templates/user_views', user, name='user')

    ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)