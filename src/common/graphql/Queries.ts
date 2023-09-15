const GET_TOTAL_PRICE = `
    query getTotalPrice {
        products_aggregate {
            aggregate {
                sum {
                    price
                }
            }
        }
    }
`;

const GET_PRODUCT_LIST = `
    query getProducts {
        products {
            id
            name
            price
            stock
            description
        }
    }
`;

export {
    GET_TOTAL_PRICE,
    GET_PRODUCT_LIST
}