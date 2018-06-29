



from django.urls import path

from meta import views



urlpatterns = [
	path( '', views.index, name = 'index' ),
	## Temporary routes due to wildcard routing conflicts
	path( 'about', views.index, name = 'about' ),
	path( 'gallery', views.index, name = 'gallery' ),
	path( 'contact', views.index, name = 'contact' ),
	## Other views for fetching data used by the frontend
	path( 'photos', views.photos, name = 'photos' ),
	path( 'text', views.text, name = 'text' ),
	path( 'social', views.social, name = 'social' )
]

""" path( '<path:url>', views.index, name = 'wild' ) """


