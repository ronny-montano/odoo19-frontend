{
    "name": "Simple public component",
    "summary": "Simple public component",
    "description": """
    Simple public component
    """,
    "author": "Ronny Montano",
    "website": "http://www.processcontrol.es",
    "category": "Base",
    "version": "19.0.0.0.1",
    "depends": ["base", "point_of_sale", "sale_management", "purchase", "project"],
    "data": [
        "views/website_template.xml",
    ],
    'assets': {
        "web.assets_frontend": [
            "simple_public_component/static/src/partner_simple_component/partner_simple_public_component.xml",
            "simple_public_component/static/src/partner_simple_component/partner_simple_public_component.js",
        ],
    },
    "license": "OPL-1",
    "installable": True,
}
