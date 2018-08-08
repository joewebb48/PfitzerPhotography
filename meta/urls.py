



from django.urls import path

from meta import views



urlpatterns = [
	path( '', views.index, name = 'index' ),
	## Temporary routes due to wildcard routing conflicts
	path( 'about', views.index, name = 'about' ),
	path( 'gallery', views.index, name = 'gallery' ),
	path( 'gallery/<path:url>', views.index, name = 'image' ),
	path( 'contact', views.index, name = 'contact' ),
	## Other views for fetching data used by the frontend
	path( 'data', views.data, name = 'data' ),
	path( 'photos', views.photos, name = 'photos' ),
	path( 'bio', views.bio, name = 'bio' ),
	path( 'social', views.social, name = 'social' ),
	path( 'email', views.email, name = 'email' )
]

""" path( '<path:url>', views.index, name = 'wild' ) """



