import {Interaction} from '@web/public/interaction';
import {registry} from "@web/core/registry";

export const limit = 10;
export const defaultModel = 'res.partner';

export const modelsValue = [{'model': 'res.partner', 'name': 'Contactos (res.partner)'}, {
    'model': 'sale.order',
    'name': 'Órdenes de venta (sale.order)'
}, {'model': 'product.product', 'name': 'Productos (product.product)'}]


export class DataResultModels extends Interaction {
    static selector = '.data-result-models';
    dynamicContent = {
        'select[name="odooModel"]': {'t-on-change': this.onChangeModel},
        '.btn-delete': {'t-on-click': this.onDeleteItem},
        "#resultBox": {
            "t-att-class": () => ({"d-none": this.itemResultCount === 2}),
        },
    };

    setup() {
        this.orm = this.services.orm;
        this.itemResultCount = 0;
        this.notification = this.services.notification;
        this.odooModelSelect = this.el.querySelector('#odooModel');
        this.dataResult = this.el.querySelector('#resultBox');
    }

    start() {
        this.odooModelSelect.innerHTML = modelsValue.map(model => `<option value="${model.model}">${model.name}</option>`).join('');
    }

    /**
     * Used to get info from server when interaction will start
     */
    async willStart() {
        const result = await this.orm.searchRead(defaultModel, [], ['id', 'name'], {limit: limit});
        this.fillDataResult(result);
    }

    /**
     * Get selected value from select item
     */
    async onChangeModel() {
        const modelSelected = this.odooModelSelect.value;
        const result = await this.orm.searchRead(modelSelected, [], ['id', 'name'], {limit: limit});
        this.fillDataResult(result);
    }

    fillDataResult(items) {
        this.itemResultCount = items.length;
        this.dataResult.innerHTML = items
            .map((item) => `
            <div class="item-row" data-value="${item.id}" 
                 style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid #ddd;">
                <span>${item.name}</span>
                <button class="btn-delete" 
                        data-id="${item.id}" 
                        style="background:#e74c3c; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">
                    Eliminar
                </button>
            </div>
        `)
            .join('');
    }

    async onDeleteItem(ev) {
        const row = this.el.querySelector(".item-row");
        if (row) row.remove();
        this.notification.add('Item eliminado correctamente', {type: 'success'});
    }
}

registry
    .category("public.interactions")
    .add("simple_interactions.DataResultModels", DataResultModels);