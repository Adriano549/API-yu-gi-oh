export interface Card {
    frameType: string;
    id: number;
    name: string;
    type: string;
    desc: string;
    atk: number;
    def: number;
    level: number;
    race: string;
    attribute: string;
    card_sets: CardSet[];
    card_images: CardImage[];
}

export interface CardSet {
    set_name: string;
    set_code: string;
    set_rarity: string;
}

export interface CardImage {
    id: number;
    image_url: string;
    image_url_small: string;
}

