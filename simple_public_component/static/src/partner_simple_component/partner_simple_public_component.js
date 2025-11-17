import {Component, useState, onWillStart} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {useService} from "@web/core/utils/hooks";
import {rpc} from "@web/core/network/rpc";
import {AlertDialog} from "@web/core/confirmation_dialog/confirmation_dialog";
import {_t} from "@web/core/l10n/translation";

export class PartnerPublicComponent extends Component {
    static template = "simple_public_component.PartnerPublicComponent";
    static props = {
        partnerName: {type: String, optional: true}
    };

    setup() {
        this.notification = useService("notification");
        this.orm = useService("orm");
        this.dialogService = useService("dialog");
        this.state = useState({
            partners: [],
        });
        onWillStart(async () => {
            this.state.partners = await this.orm.searchRead("res.partner", [], ["id", "name"], {limit: 10});
        });
    }

    async onPartnerInfoClick(partner) {
        try {
            const partnerInfo = await rpc(`/partner-resume/${partner.id}`, {});
            this.dialogService.add(AlertDialog, {
                title: _t("Info partner" + `${partner.name}`),
                body: JSON.stringify(partnerInfo),
            });
        } catch (err) {
            this.notification.add(`Error: ${err.message}`, {type: 'danger'});
        }
    }
}

registry.category("public_components").add("simple_public_component.PartnerPublicComponent", PartnerPublicComponent);