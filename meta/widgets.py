



from django.forms import ClearableFileInput



class ImageWidget( ClearableFileInput ):
	input_text = "Update"
	image_text = "Preview"
	template_name = "widget.html"
	
	def get_context( self, name, value, attrs ):
		context = super( ).get_context( name, value, attrs )
		context[ "widget" ].update( { "image_text": self.image_text } )
		return context
	
	"""
	class Media:
		css = { "all": ( "admin.css" ) }
	"""



