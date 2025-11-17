import json

from odoo import http
from odoo.http import request


class PublicSimpleController(http.Controller):
    @http.route(['/demo-interactions'], type="http", auth="public", website=True, method=['GET'], csrf=False)
    def render_simple_controller(self):
        values = {
            "partner_name": request.env.user.partner_id.name if not request.env.user._is_internal() else f"Employee {request.env.user.partner_id.name}",
        }
        return request.render('simple_interactions.my_demo_template_interactions', values)
