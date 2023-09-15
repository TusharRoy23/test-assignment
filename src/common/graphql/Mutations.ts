const ADD_PRODUCT = `
    mutation insertProduct($name: String!, $price: numeric!, $stock: Int!, $description: String) {
        insert_products(objects: {name: $name, price: $price, stock: $stock, description: $description}) {
            affected_rows
            returning {
                id,
                name,
                price,
                stock,
                description
            }
        }
    }
`;

const DELETE_PRODUCT = `
    mutation deleteProduct($id: Int!) {
        delete_products_by_pk(id: $id) {
            id
        }
    }
`;

export {
    ADD_PRODUCT,
    DELETE_PRODUCT
}