const MOCK_DATA = [
    {
        id: 'FSC-01',
        company_id: 'wdw',
        product_id: '138925',
        type: 'certificate',
        brand: 'FSC',
        created_by: '?@wedowood.dk',
        timestamp: '2021-01-01T00:00:00Z',
        parent_ids: []
    },
    {
        id: 'CARBON',
        company_id: 'wdw',
        product_id: '',
        type: 'certificate',
        brand: 'tree-nation',
        created_by: '?@wedowood.dk',
        timestamp: '2021-01-01T00:00:00Z',
        parent_ids: [],
        event_data_format: 'certificate-external-pdf',
        event_data: [
            {
                key_name: 'certificate-external-pdf-sha256',
                value: 'd775f1e60dad11f8e335d0404035066b6274e8714b81ba5f8aecdd33c41df290',
                storage: 'https://www.wedowood.dk/nominated-boligmagasinets-designawards-2/',
                type: 'plain',
                visibility: 'public'
            }
        ]
    },
    {
        id: '1-wood',
        company_id: 'wdw',
        product_id: '',
        type: 'value-chain-checkpoint-wood',
        brand: 'Phyllostachys edulis; Phyllostachys heterocycla var. pubescens',
        created_by: '?@wedowood.dk',
        timestamp: '2021-01-01T00:00:00Z',
        parent_ids: [],
        event_data_format: 'company-coords',
        event_data: [
            {
                key_name: 'company_name',
                value: 'Bamboo Supplier Name: Hangzhou Zen Bamboo&Hardwood Products Co.,Ltd.',
                storage: 'internal',
                type: 'plain',
                visibility: 'public'
            },
            {
                key_name: 'lat',
                value: '30.24406862323163',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'long',
                value: '119.80676383660662',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'batch_size_m3',
                value: '3',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'kg_co_2_e_kg',
                value: '-0.50',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'material',
                value: 'Bamboo',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            }
        ]
    },
    {
        id: '2-transportShip',
        company_id: 'wdw',
        product_id: '',
        type: 'value-chain-checkpoint-transportShip',
        brand: '',
        created_by: '?@wedowood.dk',
        timestamp: '2021-01-02T00:00:00Z',
        parent_ids: ['1-wood'],
        event_data_format: 'company-coords',
        event_data: [
            {
                key_name: 'company_name',
                value: 'Shipping Company Name/Landing',
                storage: 'internal',
                type: 'plain',
                visibility: 'public'
            },
            {
                key_name: 'lat',
                value: '45.65445858636665',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'long',
                value: '13.784689999232235',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'kg_co_2_e_kg',
                value: '0.17',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            }
        ]
    },
    {
        id: '3-transportTruck',
        company_id: 'spr',
        product_id: '',
        type: 'value-chain-checkpoint-transportTruck',
        brand: '',
        created_by: '?@wedoowood.dk',
        timestamp: '2021-01-03T00:00:00Z',
        parent_ids: ['2-transportShip'],
        event_data_format: 'company-coords',
        event_data: [
            {
                key_name: 'company_name',
                value: 'Trucking Company Name',
                storage: 'internal',
                type: 'plain',
                visibility: 'public'
            },
            {
                key_name: 'lat',
                value: '55.43341337191227',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'long',
                value: '8.64476014404983',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'kg_co_2_e_kg',
                value: '0.001',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            }
        ]
    },
    {
        id: '4-production',
        company_id: 'wdw',
        product_id: '',
        type: 'value-chain-checkpoint-production',
        brand: '',
        created_by: '?@wedowood.dk',
        timestamp: '2021-01-04T00:00:00Z',
        parent_ids: ['3-transportTruck'],
        event_data_format: 'company-coords',
        event_data: [
            {
                key_name: 'company_name',
                value: 'We Do Wood Slovenian Production Site',
                storage: 'internal',
                type: 'plain',
                visibility: 'public'
            },
            {
                key_name: 'lat',
                value: '46.43893798193902',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'long',
                value: '14.059485354482694',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'kg_co_2_e_kg',
                value: '0.1',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            }
        ]
    },
    {
        id: '5-product-1',
        company_id: 'wdw',
        product_id: 'Scoreboard Horizontal, Bamboo (2030602)',
        type: 'customer',
        brand: 'Wardrobe',
        created_by: '?@wedowood.dk',
        timestamp: '2021-01-05T00:00:00Z',
        parent_ids: ['4-production', 'CARBON'],
        event_data_format: 'company-coords',
        event_data: [
            {
                key_name: 'company_name',
                value: 'We Do Wood Denmark',
                storage: 'internal',
                type: 'plain',
                visibility: 'public'
            },
            {
                key_name: 'lat',
                value: '55.650742877350844',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'long',
                value: '12.13701937949767',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'weightInKg',
                value: 1920,
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'footprint_in_kgCO2eq',
                value: '-0.4705',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            }
        ]
    }
]

/*[
    {
        "id": "FSC-01",
        "company_id": "wdw",
        "product_id": "138925",
        "type": "certificate",
        "brand": "FSC",
        "created_by": "?@wedowood.dk",
        "timestamp": "2021-01-01T00:00:00Z",
        "parent_ids": []
    },
    {
        "id": "CARBON",
        "company_id": "wdw",
        "product_id": "",
        "type": "certificate",
        "brand": "tree-nation",
        "created_by": "?@wedowood.dk",
        "timestamp": "2021-01-01T00:00:00Z",
        "parent_ids": [],
        "event_data_format": "certificate-external-pdf",
        "event_data": [
            {
                "key_name": "certificate-external-pdf-sha256",
                "value": "d775f1e60dad11f8e335d0404035066b6274e8714b81ba5f8aecdd33c41df290",
                "storage": "https://www.wedowood.dk/nominated-boligmagasinets-designawards-2/",
                "type": "plain",
                "visibility": "public"
            }
        ]
    },
    {
        "id": "1-wood",
        "company_id": "wdw",
        "product_id": "",
        "type": "value-chain-checkpoint-wood",
        "brand": "Phyllostachys edulis; Phyllostachys heterocycla var. pubescens",
        "created_by": "?@wedowood.dk",
        "timestamp": "2021-01-01T00:00:00Z",
        "parent_ids": [],
        "event_data_format": "company-coords",
        "event_data": [
            {
                "key_name": "company_name",
                "value": "Bamboo Supplier Name: Hangzhou Zen Bamboo&Hardwood Products Co.,Ltd.",
                "storage": "internal",
                "type": "plain",
                "visibility": "public"
            },
            {
                "key_name": "lat",
                "value": "30.24406862323163",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            },
            {
                "key_name": "long",
                "value": "119.80676383660662",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            },
            {
                "key_name": "batch_size",
                "value": "3",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            },
            {
                "key_name": "kg_co_2_e_kg",
                "value": "-0.50",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            },
            {
                "key_name": "material",
                "value": "Bamboo",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            }
        ]
    },
    {
        "id": "2-transportShip",
        "company_id": "wdw",
        "product_id": "",
        "type": "value-chain-checkpoint-transportShip",
        "brand": "",
        "created_by": "?@wedowood.dk",
        "timestamp": "2021-01-02T00:00:00Z",
        "parent_ids": ["55f424e2-d592-4764-9e28-fca11acecd14"],
        "event_data_format": "company-coords",
        "event_data": [
            {
                "key_name": "company_name",
                "value": "Shipping Company Name/Landing",
                "storage": "internal",
                "type": "plain",
                "visibility": "public"
            },
            {
                "key_name": "lat",
                "value": "45.65445858636665",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            },
            {
                "key_name": "long",
                "value": "13.784689999232235",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            },
            {
                "key_name": "kg_co_2_e_kg",
                "value": "0.17",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            }
        ]
    },
    {
        "id": "3-transportTruck",
        "company_id": 'wdw',
        "product_id": "",
        "type": "value-chain-checkpoint-transportTruck",
        "brand": "",
        "created_by": "?@wedoowood.dk",
        "timestamp": "2021-01-03T00:00:00Z",
        "parent_ids": ["d613c653-e675-4268-99c3-d10bd4d3fd0f"],
        "event_data_format": "company-coords",
        "event_data": [
            {
                "key_name": "company_name",
                "value": "Trucking Company Name",
                "storage": "internal",
                "type": "plain",
                "visibility": "public"
            },
            {
                "key_name": "lat",
                "value": "55.43341337191227",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            },
            {
                "key_name": "long",
                "value": "8.64476014404983",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            },
            {
                "key_name": "kg_co_2_e_kg",
                "value": "0.001",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            }
        ]
    },
    {
        "id": "4-production",
        "company_id": "wdw",
        "product_id": '',
        "type": "value-chain-checkpoint-production",
        "brand": "",
        "created_by": "?@wedowood.dk",
        "timestamp": "2021-01-04T00:00:00Z",
        "parent_ids": ["93092f6e-8fe2-4982-b2f7-1d84e411fd99"],
        "event_data_format": "company-coords",
        "event_data": [
            {
                "key_name": "company_name",
                "value": "We Do Wood Slovenian Production Site",
                "storage": "internal",
                "type": "plain",
                "visibility": "public"
            },
            {
                "key_name": "lat",
                "value": "46.43893798193902",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            },
            {
                "key_name": "long",
                "value": "14.059485354482694",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            },
            {
                "key_name": "kg_co_2_e_kg",
                "value": "0.1",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            }
        ]
    },
    {
        "id": "5-product-1",
        "company_id": "wdw",
        "product_id": "Scoreboard Horizontal, Bamboo (2030602)",
        "type": "customer",
        "brand": "Wardrobe",
        "created_by": "?@wedowood.dk",
        "timestamp": "2021-01-05T00:00:00Z",
        "parent_ids": ["b435c2ca-5c17-44fa-868d-1d38806b02c7"],
        "event_data_format": "company-coords",
        "event_data": [
            {
                "key_name": "company_name",
                "value": "We Do Wood Denmark",
                "storage": "internal",
                "type": "plain",
                "visibility": "public"
            },
            {
                "key_name": "lat",
                "value": "55.650742877350844",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            },
            {
                "key_name": "long",
                "value": "12.13701937949767",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            },
            {
                "key_name": "weightInKg",
                "value": "1920",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            },
            {
                "key_name": "footprint_in_kgCO2eq",
                "value": "-0.4705",
                "storage": "internal",
                "type": "number",
                "visibility": "public"
            }
        ]
    }
]
*/

export default MOCK_DATA
