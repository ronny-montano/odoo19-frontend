import json

from odoo import http
from odoo.http import request


class PublicSimpleController(http.Controller):
    @http.route(['/public-component'], type="http", auth="public", website=True, method=['GET'], csrf=False)
    def render_simple_controller(self):
        values = {
            "partner_name": request.env.user.partner_id.name if not request.env.user._is_internal() else f"Employee {request.env.user.partner_id.name}",
        }
        return request.render('simple_public_component.my_template_simple_component', values)






    @http.route(['/partner-resume/<int:partner_id>'], type="json", auth="user", website=True, methods=['POST'],
                csrf=False)
    def get_partner_simple_controller(self, partner_id):
        SaleOrder = request.env['sale.order']
        PurchaseOrder = request.env['purchase.order']
        sales_summary = SaleOrder.read_group(
            [('partner_id', '=', partner_id)],
            ['amount_total:sum'],
            ['state']
        )
        purchases_summary = PurchaseOrder.read_group(
            [('partner_id', '=', partner_id)],
            ['amount_total:sum'],
            ['state']
        )
        result = {
            "sales": [
                {
                    "state": rec["state"] or "undefined",
                    "total_amount": rec["amount_total"],
                    "count": rec.get("__count", 0)
                }
                for rec in sales_summary
            ],
            "purchases": [
                {
                    "state": rec["state"] or "undefined",
                    "total_amount": rec["amount_total"],
                    "count": rec.get("__count", 0)
                }
                for rec in purchases_summary
            ]
        }
        return result
