import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

// Modified from https://codepen.io/riazxrazor/pen/Gjomdp

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

type RaindropOptions = Partial<{
    direction: "TD" | "LR" | "BU" | "RL"
    headColor: string
    trailColor: string
    fontSize: number
    fontFamily: string
    // characterBank: string[]
}>

class Raindrop {
    private charList: string[];
    previousChar: string;
    previousX: number;
    previousY: number;

    private shiftDirection: Function;

    constructor(
        public x: number,
        public y: number,
        public container: MatrixRainComponent,
        private config: RaindropOptions
    ) {
        this.randomizeChars();

        switch (config.direction) {
            case "LR": {
                this.shiftDirection = () => {
                    this.x += randomFloat(4, 12);
                    if (this.x > this.container.canvasWidth) {
                        this.randomizeChars();

                        this.x = randomFloat(-100, 0);
                    }
                }
                break;
            }
            case "BU": {
                this.shiftDirection = () => {
                    this.y -= randomFloat(4, 12);
                    if (this.y < 0) {
                        this.randomizeChars();

                        this.y = randomFloat(0, this.container.canvasHeight + 100);
                    }
                }
                break;
            }
            case "RL": {
                this.shiftDirection = () => {
                    this.x -= randomFloat(4, 12);
                    if (this.x < 0) {
                        this.randomizeChars();

                        this.x = randomFloat(0, this.container.canvasWidth + 100);
                    }
                }
                break;
            }

            case "TD":
            default: {
                this.shiftDirection = () => {
                    this.y += randomFloat(4, 12);
                    if (this.y > this.container.canvasHeight) {
                        this.randomizeChars();

                        this.y = randomFloat(-100, 0);
                    }
                };
                break;
            }
        }
    }

    randomizeChars() {
        this.charList = this.container.charArrs[~~(Math.random() * this.container.charArrs.length)];
    }

    clear(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.config.trailColor ?? "rgba(140,62,225,1)";
        ctx.font = (this.config.fontSize ?? 14) + "px " + (this.config.fontFamily ?? "Fira Sans");
        ctx.fillText(this.previousChar, this.previousX, this.previousY);
    }

    draw(ctx: CanvasRenderingContext2D) {
        const char = this.previousChar = this.charList[randomInt(0, this.charList.length - 1)];

        ctx.fillStyle = this.config.headColor ?? "rgba(255,255,255,0.8)";
        ctx.font = (this.config.fontSize ?? 14) + "px " + (this.config.fontFamily ?? "Fira Sans");
        ctx.fillText(char, this.x, this.y);

        this.previousX = this.x;
        this.previousY = this.y;

        this.shiftDirection();
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

    private _ctx;
    get canvas () { return this .canvasRef.nativeElement }
    get ctx() { return this._ctx ?? (this._ctx = this.canvas.getContext('2d'))}

    _renderFrame = 0;
    // full screen dimensions
    canvasWidth = 0;
    canvasHeight = 0;
    charLists = [
        '⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿⡀⡁⡂⡃⡄⡅⡆⡇⡈⡉⡊⡋⡌⡍⡎⡏⡐⡑⡒⡓⡔⡕⡖⡗⡘⡙⡚⡛⡜⡝⡞⡟⡠⡡⡢⡣⡤⡥⡦⡧⡨⡩⡪⡫⡬⡭⡮⡯⡰⡱⡲⡳⡴⡵⡶⡷⡸⡹⡺⡻⡼⡽⡾⡿⢀⢁⢂⢃⢄⢅⢆⢇⢈⢉⢊⢋⢌⢍⢎⢏⢐⢑⢒⢓⢔⢕⢖⢗⢘⢙⢚⢛⢜⢝⢞⢟⢠⢡⢢⢣⢤⢥⢦⢧⢨⢩⢪⢫⢬⢭⢮⢯⢰⢱⢲⢳⢴⢵⢶⢷⢸⢹⢺⢻⢼⢽⢾⢿⣀⣁⣂⣃⣄⣅⣆⣇⣈⣉⣊⣋⣌⣍⣎⣏⣐⣑⣒⣓⣔⣕⣖⣗⣘⣙⣚⣛⣜⣝⣞⣟⣠⣡⣢⣣⣤⣥⣦⣧⣨⣩⣪⣫⣬⣭⣮⣯⣰⣱⣲⣳⣴⣵⣶⣷⣸⣹⣺⣻⣼⣽⣾⣿',
        // 'ঀঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহঽৎড়ঢ়য়ৠৡ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺৻ৼ৽',
        // 'ꤰꤱꤲꤳꤴꤵꤶꤷꤸꤹꤺꤻꤼꤽꤾꤿꥀꥁꥂꥃꥄꥅꥆ',
        // 'ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰᛱᛲᛳᛴᛵᛶᛷᛸ',
        // '𝌀𝌁𝌂𝌃𝌄𝌅𝌆𝌇𝌈𝌉𝌊𝌋𝌌𝌍𝌎𝌏𝌐𝌑𝌒𝌓𝌔𝌕𝌖𝌗𝌘𝌙𝌚𝌛𝌜𝌝𝌞𝌟𝌠𝌡𝌢𝌣𝌤𝌥𝌦𝌧𝌨𝌩𝌪𝌫𝌬𝌭𝌮𝌯𝌰𝌱𝌲𝌳𝌴𝌵𝌶𝌷𝌸𝌹𝌺𝌻𝌼𝌽𝌾𝌿𝍀𝍁𝍂𝍃𝍄𝍅𝍆𝍇𝍈𝍉𝍊𝍋𝍌𝍍𝍎𝍏𝍐𝍑𝍒𝍓𝍔𝍕𝍖',
        // '𑨀𑨋𑨌𑨍𑨎𑨏𑨐𑨑𑨒𑨓𑨔𑨕𑨖𑨗𑨘𑨙𑨚𑨛𑨜𑨝𑨞𑨟𑨠𑨡𑨢𑨣𑨤𑨥𑨦𑨧𑨨𑨩𑨪𑨫𑨬𑨭𑨮𑨯𑨰𑨱𑨲𑨿𑩀𑩂𑩃𑩄𑩅𑩆',
        // '𐰀𐰁𐰂𐰃𐰄𐰅𐰆𐰇𐰈𐰉𐰊𐰋𐰌𐰍𐰎𐰏𐰐𐰑𐰒𐰓𐰔𐰕𐰖𐰗𐰘𐰙𐰚𐰛𐰜𐰝𐰞𐰟𐰠𐰡𐰢𐰣𐰤𐰥𐰦𐰧𐰨𐰩𐰪𐰫𐰬𐰭𐰮𐰯𐰰𐰱𐰲𐰳𐰴𐰵𐰶𐰷𐰸𐰹𐰺𐰻𐰼𐰽𐰾𐰿𐱀𐱁𐱂𐱃𐱄𐱅𐱆𐱇𐱈',
        // '𐄇𐄈𐄉𐄊𐄋𐄌𐄍𐄎𐄏𐄐𐄑𐄒𐄓𐄔𐄕𐄖𐄗𐄘𐄙𐄚𐄛𐄜𐄝𐄞𐄟𐄠𐄡𐄢𐄣𐄤𐄥𐄦𐄧𐄨𐄩𐄪𐄫𐄬𐄭𐄮𐄯𐄰𐄱𐄲𐄳',
        // '🞀🞁🞂🞃🞄🞅🞆🞇🞈🞉🞊🞋🞌🞍🞎🞏🞐🞑🞒🞓🞔🞕🞖🞗🞘🞙🞚🞛🞜🞝🞞🞟🞠🞡🞢🞣🞤🞥🞦🞧🞨🞩🞪🞫🞬🞭🞮🞯🞰🞱🞲🞳🞴🞵🞶🞷🞸🞹🞺🞻🞼🞽🞾🞿🟀🟁🟂🟃🟄🟅🟆🟇🟈🟉🟊🟋🟌🟍🟎🟏🟐🟑🟒🟓🟔🟕🟖🟗🟘',
        // '🁢🁣🁤🁥🁦🁧🁨🁩🁪🁫🁬🁭🁮🁯🁩🁪🁫🁬🁭🁮🁯🁰🁱🁲🁳🁴🁵🁶🁷🁸🁹🁺🁻🁼🁽🁾🁿🂀🂁🂂🂃🂄🂅🂆🂇🂈🂉🂊🂋🂌🂍🂎🂏🂐🂑🂒🂓',
        // '🀀🀁🀂🀃🀅🀆🀇🀈🀉🀊🀋🀌🀍🀎🀏🀐🀑🀒🀓🀔🀕🀖🀗🀘🀙🀚🀛🀜🀝🀞🀟🀠🀡🀢🀣🀤🀥🀦🀧🀨🀩🀪🀫',
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
    readonly warmupIterations = 100;
    readonly minFrameTime = 50;

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

        const options: RaindropOptions = {
            // headColor:  "rgba(255,0,0,1)",
            // // trailColor: "rgba(7,250,135,.8)"
            // trailColor: "rgba(244,67,54,.8)",
            // direction: "BU"
        }

        for (var i = 0; i < this.maxColums; i++) {
            this.raindrops.push(
                new Raindrop(
                    i * this.fontWidth,
                    randomFloat(-this.canvasWidth, 0),
                    this,
                    options
                ),
                new Raindrop(
                    i * this.fontWidth,
                    (this.canvasHeight / 2) + randomFloat(-this.canvasWidth, 0),
                    this,
                    options
                )
            );
        }

        this.render();

        // Preemptively draw the characters
        for (let i = 0; i < this.warmupIterations; i++)
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

        this.maxColums = this.canvasWidth / (this.fontWidth);
    }

    lastTime = Date.now();
    render = (() => {
        const t = Date.now();
        const d = t - this.lastTime;
        if (d > this.minFrameTime) {
            this.lastTime = t;
            this.drawPositions();
        }

        this._renderFrame = requestAnimationFrame(this.render);
    }).bind(this);

    drawPositions() {
        let i = this.raindrops.length;

        // Call clear before we apply the fade fill
        while (i--) {
            this.raindrops[i].clear(this.ctx);
        }

        // Fade everything slightly
        this.ctx.fillStyle = "rgba(0,0,0,0.05)";
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw the new characters
        i = this.raindrops.length;

        while (i--) {
            this.raindrops[i].draw(this.ctx);
        }
    }
}
