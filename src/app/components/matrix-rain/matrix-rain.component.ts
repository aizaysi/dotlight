import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

// Modified from https://codepen.io/riazxrazor/pen/Gjomdp

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

class Raindrop {
    public charArr: string[];
    constructor(
        public x: number,
        public y: number,
        public container: MatrixRainComponent
    ) {
        this.randomizeChars();
    }

    randomizeChars() {
        this.charArr = this.container.charArrs[~~(Math.random() * this.container.charArrs.length)];
    }

    draw(ctx: CanvasRenderingContext2D, ctx2: CanvasRenderingContext2D) {

        const value = this.charArr[randomInt(0, this.charArr.length - 1)];
        const speed = randomFloat(4, 12);

        ctx2.fillStyle = "rgba(255,255,255,0.8)";
        ctx2.font = this.container.fontSize + "px " + this.container.fontFamily;
        ctx2.fillText(value, this.x, this.y);

        // ctx.fillStyle = "#07fa87";
        ctx.fillStyle = "rgba(140,62,225,1)";
        ctx.font = this.container.fontSize + "px " + this.container.fontFamily;
        ctx.fillText(value, this.x, this.y);

        this.y += speed;
        if (this.y > this.container.canvasHeight) {
            this.randomizeChars();

            this.y = randomFloat(-100, 0);
        }
    };
}

@Component({
    selector: 'app-matrix-rain',
    templateUrl: './matrix-rain.component.html',
    styleUrls: ['./matrix-rain.component.scss'],
    standalone: true
})
export class MatrixRainComponent  {
    @ViewChild("canvas") canvasRef: ElementRef<HTMLCanvasElement>;
    @ViewChild("canvas2") canvas2Ref: ElementRef<HTMLCanvasElement>;

    private _ctx;
    private _ctx2;
    get canvas () { return this .canvasRef.nativeElement }
    get canvas2 () { return this .canvas2Ref.nativeElement }
    get ctx() { return this._ctx ?? (this._ctx = this.canvas.getContext('2d'))}
    get ctx2() { return this._ctx2 ?? (this._ctx2 = this.canvas2.getContext('2d'))}

    _renderFrame = 0;
    // full screen dimensions
    canvasWidth = 0;
    canvasHeight = 0;
    charLists = [
        '⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿⡀⡁⡂⡃⡄⡅⡆⡇⡈⡉⡊⡋⡌⡍⡎⡏⡐⡑⡒⡓⡔⡕⡖⡗⡘⡙⡚⡛⡜⡝⡞⡟⡠⡡⡢⡣⡤⡥⡦⡧⡨⡩⡪⡫⡬⡭⡮⡯⡰⡱⡲⡳⡴⡵⡶⡷⡸⡹⡺⡻⡼⡽⡾⡿⢀⢁⢂⢃⢄⢅⢆⢇⢈⢉⢊⢋⢌⢍⢎⢏⢐⢑⢒⢓⢔⢕⢖⢗⢘⢙⢚⢛⢜⢝⢞⢟⢠⢡⢢⢣⢤⢥⢦⢧⢨⢩⢪⢫⢬⢭⢮⢯⢰⢱⢲⢳⢴⢵⢶⢷⢸⢹⢺⢻⢼⢽⢾⢿⣀⣁⣂⣃⣄⣅⣆⣇⣈⣉⣊⣋⣌⣍⣎⣏⣐⣑⣒⣓⣔⣕⣖⣗⣘⣙⣚⣛⣜⣝⣞⣟⣠⣡⣢⣣⣤⣥⣦⣧⣨⣩⣪⣫⣬⣭⣮⣯⣰⣱⣲⣳⣴⣵⣶⣷⣸⣹⣺⣻⣼⣽⣾⣿',
        // 'ঀঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহঽৎড়ঢ়য়ৠৡ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺৻ৼ৽',
        // 'ꤰꤱꤲꤳꤴꤵꤶꤷꤸꤹꤺꤻꤼꤽꤾꤿꥀꥁꥂꥃꥄꥅꥆ',
        // 'ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰᛱᛲᛳᛴᛵᛶᛷᛸ',
        // '𝌀𝌁𝌂𝌃𝌄𝌅𝌆𝌇𝌈𝌉𝌊𝌋𝌌𝌍𝌎𝌏𝌐𝌑𝌒𝌓𝌔𝌕𝌖𝌗𝌘𝌙𝌚𝌛𝌜𝌝𝌞𝌟𝌠𝌡𝌢𝌣𝌤𝌥𝌦𝌧𝌨𝌩𝌪𝌫𝌬𝌭𝌮𝌯𝌰𝌱𝌲𝌳𝌴𝌵𝌶𝌷𝌸𝌹𝌺𝌻𝌼𝌽𝌾𝌿𝍀𝍁𝍂𝍃𝍄𝍅𝍆𝍇𝍈𝍉𝍊𝍋𝍌𝍍𝍎𝍏𝍐𝍑𝍒𝍓𝍔𝍕𝍖',
        // '𑨀𑨋𑨌𑨍𑨎𑨏𑨐𑨑𑨒𑨓𑨔𑨕𑨖𑨗𑨘𑨙𑨚𑨛𑨜𑨝𑨞𑨟𑨠𑨡𑨢𑨣𑨤𑨥𑨦𑨧𑨨𑨩𑨪𑨫𑨬𑨭𑨮𑨯𑨰𑨱𑨲𑨿𑩀𑩂𑩃𑩄𑩅𑩆',
        // '𐰀𐰁𐰂𐰃𐰄𐰅𐰆𐰇𐰈𐰉𐰊𐰋𐰌𐰍𐰎𐰏𐰐𐰑𐰒𐰓𐰔𐰕𐰖𐰗𐰘𐰙𐰚𐰛𐰜𐰝𐰞𐰟𐰠𐰡𐰢𐰣𐰤𐰥𐰦𐰧𐰨𐰩𐰪𐰫𐰬𐰭𐰮𐰯𐰰𐰱𐰲𐰳𐰴𐰵𐰶𐰷𐰸𐰹𐰺𐰻𐰼𐰽𐰾𐰿𐱀𐱁𐱂𐱃𐱄𐱅𐱆𐱇𐱈',
        // '𐄇𐄈𐄉𐄊𐄋𐄌𐄍𐄎𐄏𐄐𐄑𐄒𐄓𐄔𐄕𐄖𐄗𐄘𐄙𐄚𐄛𐄜𐄝𐄞𐄟𐄠𐄡𐄢𐄣𐄤𐄥𐄦𐄧𐄨𐄩𐄪𐄫𐄬𐄭𐄮𐄯𐄰𐄱𐄲𐄳',
        // '🞀🞁🞂🞃🞄🞅🞆🞇🞈🞉🞊🞋🞌🞍🞎🞏🞐🞑🞒🞓🞔🞕🞖🞗🞘🞙🞚🞛🞜🞝🞞🞟🞠🞡🞢🞣🞤🞥🞦🞧🞨🞩🞪🞫🞬🞭🞮🞯🞰🞱🞲🞳🞴🞵🞶🞷🞸🞹🞺🞻🞼🞽🞾🞿🟀🟁🟂🟃🟄🟅🟆🟇🟈🟉🟊🟋🟌🟍🟎🟏🟐🟑🟒🟓🟔🟕🟖🟗🟘',
        // '🁢🁣🁤🁥🁦🁧🁨🁩🁪🁫🁬🁭🁮🁯🁩🁪🁫🁬🁭🁮🁯🁰🁱🁲🁳🁴🁵🁶🁷🁸🁹🁺🁻🁼🁽🁾🁿🂀🂁🂂🂃🂄🂅🂆🂇🂈🂉🂊🂋🂌🂍🂎🂏🂐🂑🂒🂓',
        // '🀀🀁🀂🀃🀄🀅🀆🀇🀈🀉🀊🀋🀌🀍🀎🀏🀐🀑🀒🀓🀔🀕🀖🀗🀘🀙🀚🀛🀜🀝🀞🀟🀠🀡🀢🀣🀤🀥🀦🀧🀨🀩🀪🀫',
        // '🂠🂡🂢🂣🂤🂥🂦🂧🂨🂩🂪🂫🂬🂭🂮🂱🂲🂳🂴🂵🂶🂷🂸🂹🂺🂻🂼🂽🂾🃁🃂🃃🃄🃅🃆🃇🃈🃉🃊🃋🃌🃍🃎🂱🂲🂳🂴🂵🂶🂷🂸🂹🂺🂻🂼🂽🂾🃁🃂🃃🃄🃅🃆🃇🃈🃉🃊🃋🃌🃍🃎🃑🃒🃓🃔🃕🃖🃗🃘🃙🃚🃛🃜🃝🃞🃟',
        // '🀰🀱🀲🀳🀴🀵🀶🀷🀸🀹🀺🀻🀼🀽🀾🀿🁀🁁🁂🁃🁄🁅🁆🁇🁈🁉🁊🁋🁌🁍🁎🁏🁐🁑🁒🁓🁔🁕🁖🁗🁘🁙🁚🁛🁜🁝🁞🁟🁠🁡',
        // '𑫀𑫁𑫂𑫃𑫄𑫅𑫆𑫇𑫈𑫉𑫊𑫋𑫌𑫍𑫎𑫏𑫐𑫑𑫒𑫓𑫔𑫕𑫖𑫗𑫘𑫙𑫚𑫛𑫜𑫝𑫞𑫟𑫠𑫡𑫢𑫣𑫤𑫥𑫦𑫧𑫨𑫩𑫪𑫫𑫬𑫭𑫮𑫯𑫰𑫱𑫲𑫳𑫴𑫵𑫶𑫷𑫸',
        // 'ᮃᮄᮅᮆᮇᮈᮉᮊᮋᮌᮍᮎᮏᮐᮑᮒᮓᮔᮕᮖᮗᮘᮙᮚᮛᮜᮝᮞᮟᮠᮮᮯ᮰᮱᮲᮳᮴᮵᮶᮷᮸᮹ᮺᮻᮼᮽᮾᮿᯀᯁᯂᯃᯄᯅᯆᯇᯈᯉᯊᯋᯌᯍᯎᯏᯐᯑᯒᯓᯔᯕᯖᯗᯘᯙᯚᯛᯜᯝᯞᯟᯠᯡᯢᯣᯤᯥ',
        // '𛅰𛅱𛅲𛅳𛅴𛅵𛅶𛅷𛅸𛅹𛅺𛅻𛅼𛅽𛅾𛅿𛆀𛆁𛆂𛆃𛆄𛆅𛆆𛆇𛆈𛆉𛆊𛆋𛆌𛆍𛆎𛆏𛆐𛆑𛆒𛆓𛆔𛆕𛆖𛆗𛆘𛆙𛆚𛆛𛆜𛆝𛆞𛆟𛆠𛆡𛆢𛆣𛆤𛆥𛆦𛆧𛆨𛆩𛆪𛆫𛆬𛆭𛆮𛆯𛆰𛆱𛆲𛆳𛆴𛆵𛆶𛆷𛆸𛆹𛆺𛆻𛆼𛆽𛆾𛆿𛇀𛇁𛇂𛇃𛇄𛇅𛇆𛇇𛇈𛇉𛇊𛇋𛇌𛇍𛇎𛇏𛇐𛇑𛇒𛇓𛇔𛇕𛇖𛇗𛇘𛇙𛇚𛇛𛇜𛇝𛇞𛇟𛇠𛇡𛇢𛇣𛇤𛇥𛇦𛇧𛇨𛇩𛇪𛇫𛇬𛇭𛇮𛇯𛇰𛇱𛇲𛇳𛇴𛇵𛇶𛇷𛇸𛇹𛇺𛇻𛇼𛇽𛇾𛇿𛈀𛈁𛈂𛈃𛈄𛈅𛈆𛈇𛈈𛈉𛈊𛈋𛈌𛈍𛈎𛈏𛈐𛈑𛈒𛈓𛈔𛈕𛈖𛈗𛈘𛈙𛈚𛈛𛈜𛈝𛈞𛈟𛈠𛈡𛈢𛈣𛈤𛈥𛈦𛈧𛈨𛈩𛈪𛈫𛈬𛈭𛈮𛈯𛈰𛈱𛈲𛈳𛈴𛈵𛈶𛈷𛈸𛈹𛈺𛈻𛈼𛈽𛈾𛈿𛉀𛉁𛉂𛉃𛉄𛉅𛉆𛉇𛉈𛉉𛉊𛉋𛉌𛉍𛉎𛉏𛉐𛉑𛉒𛉓𛉔𛉕𛉖𛉗𛉘𛉙𛉚𛉛𛉜𛉝𛉞𛉟𛉠𛉡𛉢𛉣𛉤𛉥𛉦𛉧𛉨𛉩𛉪𛉫𛉬𛉭𛉮𛉯𛉰𛉱𛉲𛉳𛉴𛉵𛉶𛉷𛉸𛉹𛉺𛉻𛉼𛉽𛉾𛉿𛊀𛊁𛊂𛊃𛊄𛊅𛊆𛊇𛊈𛊉𛊊𛊋𛊌𛊍𛊎𛊏𛊐𛊑𛊒𛊓𛊔𛊕𛊖𛊗𛊘𛊙𛊚𛊛𛊜𛊝𛊞𛊟𛊠𛊡𛊢𛊣𛊤𛊥𛊦𛊧𛊨𛊩𛊪𛊫𛊬𛊭𛊮𛊯𛊰𛊱𛊲𛊳𛊴𛊵𛊶𛊷𛊸𛊹𛊺𛊻𛊼𛊽𛊾𛊿𛋀𛋁𛋂𛋃𛋄𛋅𛋆𛋇𛋈𛋉𛋊𛋋𛋌𛋍𛋎𛋏𛋐𛋑𛋒𛋓𛋔𛋕𛋖𛋗𛋘𛋙𛋚𛋛𛋜𛋝𛋞𛋟𛋠𛋡𛋢𛋣𛋤𛋥𛋦𛋧𛋨𛋩𛋪𛋫𛋬𛋭𛋮𛋯𛋰𛋱𛋲𛋳𛋴𛋵𛋶𛋷𛋸𛋹𛋺𛋻',
        // 'ꀀꀁꀂꀃꀄꀅꀆꀇꀈꀉꀊꀋꀌꀍꀎꀏꀐꀑꀒꀓꀔꀕꀖꀗꀘꀙꀚꀛꀜꀝꀞꀟꀠꀡꀢꀣꀤꀥꀦꀧꀨꀩꀪꀫꀬꀭꀮꀯꀰꀱꀲꀳꀴꀵꀶꀷꀸꀹꀺꀻꀼꀽꀾꀿꁀꁁꁂꁃꁄꁅꁆꁇꁈꁉꁊꁋꁌꁍꁎꁏꁐꁑꁒꁓꁔꁕꁖꁗꁘꁙꁚꁛꁜꁝꁞꁟꁠꁡꁢꁣꁤꁥꁦꁧꁨꁩꁪꁫꁬꁭꁮꁯꁰꁱꁲꁳꁴꁵꁶꁷꁸꁹꁺꁻꁼꁽꁾꁿꂀꂁꂂꂃꂄꂅꂆꂇꂈꂉꂊꂋꂌꂍꂎꂏꂐꂑꂒꂓꂔꂕꂖꂗꂘꂙꂚꂛꂜꂝꂞꂟꂠꂡꂢꂣꂤꂥꂦꂧꂨꂩꂪꂫꂬꂭꂮꂯꂰꂱꂲꂳꂴꂵꂶꂷꂸꂹꂺꂻꂼꂽꂾꂿꃀꃁꃂꃃꃄꃅꃆꃇꃈꃉꃊꃋꃌꃍꃎꃏꃐꃑꃒꃓꃔꃕꃖꃗꃘꃙꃚꃛꃜꃝꃞꃟꃠꃡꃢꃣꃤꃥꃦꃧꃨꃩꃪꃫꃬꃭꃮꃯꃰꃱꃲꃳꃴꃵꃶꃷꃸꃹꃺꃻꃼꃽꃾꃿꄀꄁꄂꄃꄄꄅꄆꄇꄈꄉꄊꄋꄌꄍꄎꄏꄐꄑꄒꄓꄔꄕꄖꄗꄘꄙꄚꄛꄜꄝꄞꄟꄠꄡꄢꄣꄤꄥꄦꄧꄨꄩꄪꄫꄬꄭꄮꄯꄰꄱꄲꄳꄴꄵꄶꄷꄸꄹꄺꄻꄼꄽꄾꄿꅀꅁꅂꅃꅄꅅꅆꅇꅈꅉꅊꅋꅌꅍꅎꅏꅐꅑꅒꅓꅔꅕꅖꅗꅘꅙꅚꅛꅜꅝꅞꅟꅠꅡꅢꅣꅤꅥꅦꅧꅨꅩꅪꅫꅬꅭꅮꅯꅰꅱꅲꅳꅴꅵꅶꅷꅸꅹꅺꅻꅼꅽꅾꅿꆀꆁꆂꆃꆄꆅꆆꆇꆈꆉꆊꆋꆌꆍꆎꆏꆐꆑꆒꆓꆔꆕꆖꆗꆘꆙꆚꆛꆜꆝꆞꆟꆠꆡꆢꆣꆤꆥꆦꆧꆨꆩꆪꆫꆬꆭꆮꆯꆰꆱꆲꆳꆴꆵꆶꆷꆸꆹꆺꆻꆼꆽꆾꆿꇀꇁꇂꇃꇄꇅꇆꇇꇈꇉꇊꇋꇌꇍꇎꇏꇐꇑꇒꇓꇔꇕꇖꇗꇘꇙꇚꇛꇜꇝꇞꇟꇠꇡꇢꇣꇤꇥꇦꇧꇨꇩꇪꇫꇬꇭꇮꇯꇰꇱꇲꇳꇴꇵꇶꇷꇸꇹꇺꇻꇼꇽꇾꇿꈀꈁꈂꈃꈄꈅꈆꈇꈈꈉꈊꈋꈌꈍꈎꈏꈐꈑꈒꈓꈔꈕꈖꈗꈘꈙꈚꈛꈜꈝꈞꈟꈠꈡꈢꈣꈤꈥꈦꈧꈨꈩꈪꈫꈬꈭꈮꈯꈰꈱꈲꈳꈴꈵꈶꈷꈸꈹꈺꈻꈼꈽꈾꈿꉀꉁꉂꉃꉄꉅꉆꉇꉈꉉꉊꉋꉌꉍꉎꉏꉐꉑꉒꉓꉔꉕꉖꉗꉘꉙꉚꉛꉜꉝꉞꉟꉠꉡꉢꉣꉤꉥꉦꉧꉨꉩꉪꉫꉬꉭꉮꉯꉰꉱꉲꉳꉴꉵꉶꉷꉸꉹꉺꉻꉼꉽꉾꉿꊀꊁꊂꊃꊄꊅꊆꊇꊈꊉꊊꊋꊌꊍꊎꊏꊐꊑꊒꊓꊔꊕꊖꊗꊘꊙꊚꊛꊜꊝꊞꊟꊠꊡꊢꊣꊤꊥꊦꊧꊨꊩꊪꊫꊬꊭꊮꊯꊰꊱꊲꊳꊴꊵꊶꊷꊸꊹꊺꊻꊼꊽꊾꊿꋀꋁꋂꋃꋄꋅꋆꋇꋈꋉꋊꋋꋌꋍꋎꋏꋐꋑꋒꋓꋔꋕꋖꋗꋘꋙꋚꋛꋜꋝꋞꋟꋠꋡꋢꋣꋤꋥꋦꋧꋨꋩꋪꋫꋬꋭꋮꋯꋰꋱꋲꋳꋴꋵꋶꋷꋸꋹꋺꋻꋼꋽꋾꋿꌀꌁꌂꌃꌄꌅꌆꌇꌈꌉꌊꌋꌌꌍꌎꌏꌐꌑꌒꌓꌔꌕꌖꌗꌘꌙꌚꌛꌜꌝꌞꌟꌠꌡꌢꌣꌤꌥꌦꌧꌨꌩꌪꌫꌬꌭꌮꌯꌰꌱꌲꌳꌴꌵꌶꌷꌸꌹꌺꌻꌼꌽꌾꌿꍀꍁꍂꍃꍄꍅꍆꍇꍈꍉꍊꍋꍌꍍꍎꍏꍐꍑꍒꍓꍔꍕꍖꍗꍘꍙꍚꍛꍜꍝꍞꍟꍠꍡꍢꍣꍤꍥꍦꍧꍨꍩꍪꍫꍬꍭꍮꍯꍰꍱꍲꍳꍴꍵꍶꍷꍸꍹꍺꍻꍼꍽꍾꍿꎀꎁꎂꎃꎄꎅꎆꎇꎈꎉꎊꎋꎌꎍꎎꎏꎐꎑꎒꎓꎔꎕꎖꎗꎘꎙꎚꎛꎜꎝꎞꎟꎠꎡꎢꎣꎤꎥꎦꎧꎨꎩꎪꎫꎬꎭꎮꎯꎰꎱꎲꎳꎴꎵꎶꎷꎸꎹꎺꎻꎼꎽꎾꎿꏀꏁꏂꏃꏄꏅꏆꏇꏈꏉꏊꏋꏌꏍꏎꏏꏐꏑꏒꏓꏔꏕꏖꏗꏘꏙꏚꏛꏜꏝꏞꏟꏠꏡꏢꏣꏤꏥꏦꏧꏨꏩꏪꏫꏬꏭꏮꏯꏰꏱꏲꏳꏴꏵꏶꏷꏸꏹꏺꏻꏼꏽꏾꏿꐀꐁꐂꐃꐄꐅꐆꐇꐈꐉꐊꐋꐌꐍꐎꐏꐐꐑꐒꐓꐔꐕꐖꐗꐘꐙꐚꐛꐜꐝꐞꐟꐠꐡꐢꐣꐤꐥꐦꐧꐨꐩꐪꐫꐬꐭꐮꐯꐰꐱꐲꐳꐴꐵꐶꐷꐸꐹꐺꐻꐼꐽꐾꐿꑀꑁꑂꑃꑄꑅꑆꑇꑈꑉꑊꑋꑌꑍꑎꑏꑐꑑꑒꑓꑔꑕꑖꑗꑘꑙꑚꑛꑜꑝꑞꑟꑠꑡꑢꑣꑤꑥꑦꑧꑨꑩꑪꑫꑬꑭꑮꑯꑰꑱꑲꑳꑴꑵꑶꑷꑸꑹꑺꑻꑼꑽꑾꑿꒀꒁꒂꒃꒄꒅꒆꒇꒈꒉꒊꒋꒌ',
    ];
    charArrs = [];
    raindrops: Raindrop[] = [];
    fontSize = 14;
    fontWidth = 8;
    fontFamily = "Fira Sans";
    maxColums = 0;

    private observer: ResizeObserver;

    constructor(private readonly viewcontainer: ViewContainerRef) {
        this.observer = new ResizeObserver(() => this.onResize());
        this.observer.observe(this.viewcontainer.element.nativeElement);

        // Spread operator correctly serializes unicode
        this.charLists.forEach(list => {
            this.charArrs.push([...list])
        });
    }

    ngAfterViewInit() {
        this.onResize();

        for (var i = 0; i < this.maxColums; i++) {
            this.raindrops.push(
                new Raindrop(
                    i * this.fontWidth,
                    randomFloat(-this.canvasWidth, 0),
                    this
                )
            );
        }

        for (var i = 0; i < this.maxColums; i++) {
            this.raindrops.push(
                new Raindrop(
                    i * this.fontWidth,
                    (this.canvasHeight / 2) + randomFloat(-this.canvasWidth, 0),
                    this
                )
            );
        }

        this.render();

        // Preemptively draw the characters
        for (let i = 0; i < 100; i++)
            this.drawPositions();
    }

    ngOnDestroy() {
        cancelAnimationFrame(this._renderFrame);
        this.observer.disconnect();
    }

    onResize() {
        this.canvasWidth = this.viewcontainer.element.nativeElement.clientWidth;
        this.canvasHeight = this.viewcontainer.element.nativeElement.clientHeight;

        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas2.width = this.canvasWidth;
        this.canvas2.height = this.canvasHeight;

        this.maxColums = this.canvasWidth / (this.fontWidth);
    }

    lastTime = Date.now();
    render = (() => {
        const t = Date.now();
        const d = t - this.lastTime;
        if (d > 50) {
            this.lastTime = t;
            this.drawPositions();
        }

        this._renderFrame = requestAnimationFrame(this.render);
    }).bind(this);

    drawPositions() {
        this.ctx.fillStyle = "rgba(0,0,0,0.05)";
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        this.ctx2.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        var i = this.raindrops.length;

        while (i--) {
            this.raindrops[i].draw(this.ctx, this.ctx2);
        }
    }
}
