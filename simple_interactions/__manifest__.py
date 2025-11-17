{
    "name": "Interactions",
    "summary": "Interactions",
    "description": """
    Interactions
    """,
    "author": "Ronny Montano",
    "category": "Base",
    "version": "19.0.0.0.1",
    "depends": ["base", "web"],
    "data": [
        "views/website_template.xml",
    ],
    'assets': {
        "web.assets_frontend": [
            'simple_interactions/static/src/interactions/data_result_models.js',
        ],
    },
    "license": "OPL-1",
    "installable": True,
}
