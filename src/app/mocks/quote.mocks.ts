import { QuoteModel } from '../model/QuoteModel.interface';

const quoteList: QuoteModel[] = [
    new QuoteModel(0, 'Mysl a víra tvoří tvoji budoucnost.', true),
    new QuoteModel(1, 'Tvůj největší přítel jsi ty sám.', false),
    new QuoteModel(2, 'V myšlenkách se skrývají neuvěřitelné věci. Objevuj je a nechej se jimi inspirovat.', false),
    new QuoteModel(3, '-n-, jakmile se dostaneš z černé nálady, ke které máš občasný sklon, začneš oprašovat knihy, sporotovat a nebo drhnout podlahu - to je způsob, jak setřeš slzy.', true, '', 'Vráťo', ['me']),
    new QuoteModel(4, 'Něco hlubokého pro srdíčko.', true, '', '', ['quote', 'me']),
    new QuoteModel(5, '-n-, jsi ten nejsvědomitější na rodinu zaměřený člověk, i přesto však rád pravidelně utíkáš z domu. Ne že bys nechtěl být s rodinou, ale je to proto, abys mohl být alespoň chvíli sám a mohl dál rozvíjet svou osobonost.', true, '', 'Vráťo', ['me']),
    new QuoteModel(6, 'Mít jemné srdce v drsném světě je odvaha, ne slabost.', false, '', '', ['quote']),
    new QuoteModel(7, '-n-, vždycky jsem ti říkala, neutrácej!', false, '', 'Vráťo', ['mother']),
    new QuoteModel(8, 'Kup si něco hezkého na sebe!', false, '', 'Vráťo', ['friend']),
];

export const QUOTE_LIST = quoteList; 