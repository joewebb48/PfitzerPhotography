



from django.urls import path

from meta import views



urlpatterns = [
	## Base route for processing every page render
	path( '', views.index, name = 'index' ),
	## Views for fetching data used by the frontend
	path( 'data', views.data, name = 'data' ),
	path( 'photos', views.photos, name = 'photos' ),
	path( 'image', views.image, name = 'image' ),
	path( 'bio', views.bio, name = 'bio' ),
	path( 'social', views.social, name = 'social' ),
	path( 'email', views.email, name = 'email' ),
	## Fallback wildcard routing for any dynamic url
	path( '<path:url>', views.index, name = 'wild' )
]


