
// gettext _ substitution

function _(str){
    return str
}

const PAT_AS_SURN = false;

// to remove from here
//const UNKNOWN = -1;
//const CUSTOM = 0;
//const NONE = 1;
//const INHERITED = 2;
//const GIVEN = 3;
//const TAKEN = 4;
//const "Patronymic" = 5;
//const "Matronymic" = 6;
//const FEUDAL = 7;
//const PSEUDONYM = 8;
//const PATRILINEAL = 9;
//const MATRILINEAL = 10;
//const OCCUPATION = 11;
//const LOCATION = 12;


const ARABIC_COMMA = '\u060C'
const ARABIC_SEMICOLON = '\u061B'
//-----------------------------------------------------------------//
// Functions to extract data from raw lists (unserialized objects) //
//-----------------------------------------------------------------//


function _rawFullSurname(rawSurnDataList){
//    method for the 'l' symbol: full surnames"
    let result = ""
    for(const rawSurnData of rawSurnDataList)
        result += __formatRawSurname(rawSurnData);
    return result.trim()
}


function  __formatRawSurname(rawSurnData){
//    Return a formatted string representing one surname part.
//
//    If the connector is a hyphen, don't pad it with spaces.
    let result = rawSurnData?.prefix
    if(result)
        result += " ";
    result += rawSurnData?.surname;
    if(result && rawSurnData?.connector !== "-")
        result += ` ${rawSurnData?.connector} ` ;
    else
        result += rawSurnData?.connector;
    return result;
}

function _rawPatroSurname(rawSurnDataList){
//    method for the 'y' symbol: patronymic surname
    for (const rawSurnData of rawSurnDataList){
        if (
            rawSurnData?.origintype === "Patronymic" ||
	        rawSurnData?.origintype === "Matronymic"
        )
            return __formatRawSurname(rawSurnData).trim();

    }
    return ""
}

function _rawPatroSurnameOnly(rawSurnDataList){
//    method for the '1y' symbol: patronymic surname only
    for (const rawSurnData of rawSurnDataList){
        if (
            rawSurnData?.origintype === "Patronymic" ||
	        rawSurnData?.origintype === "Matronymic"
        ){
		    let result = rawSurnData?.surname;
		    return result.split(/\s+/).join(" ").trim();
	    }
    }
    return ""
}

function _rawPatroPrefixOnly(rawSurnDataList){
//    method for the '0y' symbol: patronymic prefix only
    for (const rawSurnData of rawSurnDataList){
        if (
            rawSurnData?.origintype === "Patronymic" ||
	        rawSurnData?.origintype === "Matronymic"
        ){
		    let result = rawSurnData?.prefix;
		    return result.split(/\s+/).join(" ").trim();
	    }
    }
    return ""
}

function _rawPatroConnOnly(rawSurnDataList){
//    method for the '2y' symbol: patronymic conn only
    for (const rawSurnData of rawSurnDataList){
        if (
            rawSurnData?.origintype === "Patronymic" ||
	        rawSurnData?.origintype === "Matronymic"
        ){
		    let result = rawSurnData?.connector;
		    return result.split(/\s+/).join(" ").trim();
	    }
    }
    return ""
}

function _rawPrimarySurname(rawSurnDataList){
//  method for the 'm' symbol: primary surname
    let nrsur = rawSurnDataList.length
    for(const rawSurnData of rawSurnDataList){
        if (rawSurnData?.primary){
            if (
                ! PAT_AS_SURN
                && nrsur === 1
                && (
                    rawSurnData?.origintype === "Patronymic"
                    || rawSurnData?.origintype === "Matronymic"
                )
                ){
                    return "";
                } else {
                    return __formatRawSurname(rawSurnData);
	            }
        }
    }
    return ""
}

function _rawPrimarySurnameOnly(rawSurnDataList){
//   method for the '1m' symbol: primary surname
    let nrsur = rawSurnDataList.length
    for(const rawSurnData of rawSurnDataList){
        if (rawSurnData?.primary){
            if (
                ! PAT_AS_SURN
                && nrsur === 1
                && (
                    rawSurnData?.origintype === "Patronymic"
                    || rawSurnData?.origintype === "Matronymic"
                )
            ){
                return "";
            } else {
                return rawSurnData?.surname;
            }
	    }
    }
    return ""
}

function _rawPrimaryPrefixOnly(rawSurnDataList){
//  method for the '0m' symbol: primary surname
    let nrsur = rawSurnDataList.length
    for(const rawSurnData of rawSurnDataList){
        if (rawSurnData?.primary){
            if (
                ! PAT_AS_SURN
                && nrsur === 1
                && (
                    rawSurnData?.origintype === "Patronymic"
                    || rawSurnData?.origintype === "Matronymic"
                )
            )
                return "";
	   else
                return rawSurnData?.prefix;
	}
    }
    return ""
}

function _rawPrimaryConnOnly(rawSurnDataList){
//  method for the '2m' symbol: primary surname
    let nrsur = rawSurnDataList.length
    for(const rawSurnData of rawSurnDataList){
        if (rawSurnData?.primary){
            if (
                ! PAT_AS_SURN
                && nrsur === 1
                && (
                    rawSurnData?.origintype === "Patronymic"
                    || rawSurnData?.origintype === "Matronymic"
                )
            )
                return "";
	   else
                return rawSurnData?.connector;
	}
    }
    return ""
}

function _rawNonpatroSurname(rawSurnDataList){
//    method for the 'o' symbol: full surnames without pa/matronymic or primary
    let result = "";
    for(const rawSurnData in rawSurnDataList){
        if (
            ! rawSurnData?.primary
            && rawSurnData?.origintype !== "Patronymic"
            && rawSurnData?.origintype !== "Matronymic"
        )
            result += __formatRawSurname(rawSurnData);
    }
    return result.trim();
}

function _rawNonprimarySurname(rawSurnDataList){
//   method for the 'r' symbol: nonprimary surnames
    let result = "";
    for(const rawSurnData of rawSurnDataList){
        if(! rawSurnData?.primary)
            result += __formatRawSurname(rawSurnData);
    }
    return result.trim();
}

function _rawPrefixSurname(rawSurnDataList){
//    method for the 'p' symbol: all prefixes
    let result = "";
    for(const rawSurnData of rawSurnDataList)
        result += `${rawSurnData.prefix} `;
    return result.split(/\s+/).trim().join(" ");
}

function _rawSingleSurname(rawSurnDataList){
//    method for the 'q' symbol: surnames without prefix and connectors
    let result = "";
    for(const rawSurnData of rawSurnDataList){
        result += `${rawSurnData.surname} `;
    }
    return result.split(/\s+/).trim().join(" ");
}

function _cmpKey(objA, objB) {
    if (objA.keyword.length > objB.keyword.length){
        return -1;
    } else if (objA.keyword.length === objB.keyword.length) {
        return objA.keyword > objB.keyword ? -1 : 1;
    } else {
        return 1
    }
}

const tokenMap = new Map([
        [
            "%t",
            [
                (nameObj) => nameObj?.title ?? '',
                "title",
                _("title")
            ]
        ],
		[
            "%f",
            [
                (nameObj) => nameObj?.first_name ?? '',
                "given",
                _("given")
            ]
        ],
        [
            "%l",
            [
                (nameObj) => nameObj?.surname_list ?_rawFullSurname(nameObj.surname_list): "",
                "surname",
                _("surname")
            ]
        ],
        [
            "%s",
            [
                (nameObj) => nameObj?.suffix ?? '',
                "suffix",
                _("suffix")
            ]
        ],
        [
            "%c",
            [
                (nameObj) => nameObj?.call ?? '',
                "call",
                _("call")
            ]
        ],
        [
            "%x",
            [
                (nameObj) => nameObj?.nick || nameObj?.call || nameObj?.first.split(' ')[0] || '',
                "common",
                _("commonName")
            ],
        ],
        [
            "%i",
            [

                (nameObj) => (". " + nameObj?.first).split(/\s+/).map(k => k[0] + '.').slice(1).join(''),
                "initials",
                _("initials"),
            ]
        ],
		[
            "%m",
            [
                (nameObj) => nameObj?.surname_list ?_rawPrimarySurname(nameObj?.surname_list) : "",
                "primary",
                _("primaryName")
            ]
        ],
		[
            "%0m",
            [
                (nameObj) => nameObj?.surname_list ? _rawPrimaryPrefixOnly(nameObj?.surname_list) : "",
                "primary[pre]",
                _("primary[pre]")
            ]
        ],
		[
            "%1m",
            [
                (nameObj) => nameObj?.surname_list ? _rawPrimarySurnameOnly(nameObj?.surname_list) : "",
                "primary[sur]",
                _("primary[sur]")
            ]
        ],
		[
            "%2m",
            [
                (nameObj) => nameObj?.surname_list ? _rawPrimaryConnOnly(nameObj?.surname_list) : "",
                "primary[con]",
                _("primary[con]")
            ]
        ],
		[
            "%y",
            [
                (nameObj) => nameObj?.surname_list ? _rawPatroSurname(nameObj.surname_list) : "",
                "patronymic",
                _("patronymic")
            ]
        ],
		[
            "%0y",
            [
                (nameObj) => nameObj?.surname_list ? _rawPatroPrefixOnly(nameObj.surname_list) : "",
                "patronymic[pre]",
                _("patronymic[pre]")
            ]
        ],
		[
            "%1y",
            [
                (nameObj) => nameObj?.surname_list ? _rawPatroSurnameOnly(nameObj.surname_list) : "",
                "patronymic[sur]",
                _("patronymic[sur]")
            ]
        ],
		[
            "%2y",
            [
                (nameObj) => nameObj?.surname_list ? _rawPatroConnOnly(nameObj.surname_list) : "",
                "patronymic[con]",
                _("patronymic[con]")
            ]
        ],
        [
            "%o",
            [
                (nameObj) => nameObj?.surname_list ? _rawNonpatroSurname(nameObj.surname_list) : "",
                "notpatronymic",
                _("notpatronymic"),
            ]
        ],
        [
            "%r",
            [
                (nameObj) => nameObj?.surname_list ? _rawNonprimarySurname(nameObj.surname_list) : "",
                "rest",
                _("rest, Remaining names"),
            ]
        ],
        [
            "%p",
            [
                (nameObj) => nameObj?.surname_list ? _rawPrefixSurname(nameObj.surname_list) : "",
                "prefix",
                _("prefix")
            ]
        ],
        [
            "%q",
            [
                (nameObj) => nameObj?.surname_list ? _rawSingleSurname(nameObj.surname_list) : "",
                "rawsurnames",
                _("rawsurnames")
            ]
        ],
        [
            "%n",
            [
                (nameObj) => nameObj?.nick ?? "",
                "nickname",
                _("nickname")
            ]
        ],
        [
            "%g",
            [
                (nameObj) => nameObj?.famnick ?? "",
                "familynick",
                _("familynick")
            ]
        ],
]);

function _tokenize(formatStr){
     // let tokenMap = this.constructor.tokenMap;
     //let formatStr = this._fmtStr;
     // Get lower and upper versions of codes:
     // let codes = list(d.keys()) + [c.upper() for c in d]
     let codes = [ ...tokenMap.keys(), ...tokenMap.keys().map(i => i.toUpperCase())]
     // Next, list out the matching patterns:
     // If it starts with "!" however, treat the punctuation verbatim:
     let patterns = [];
     if (formatStr.length > 0 && formatStr.charAt(0) === "!") {
         patterns = [
              codes.join("|"),  // %s
         ];
         formatStr = formatStr.slice(1)
     } else {
         patterns = [
             ',\\W*"(?:' + codes.join("|") + ')"',  // ,\W*"%s"
             ",\\W*\\((?:" + codes.join("|") + ")\\)",  // ,\W*(%s)
             ",\\W*(?:" + codes.join("|") + ")",  // ,\W*%s
             '"(?:' + codes.join("|") + ')"',  // "%s"
             "_(?:" + codes.join("|") + ")_",  // _%s_
             "\\((?:" + codes.join("|") + ")\\)",  // (%s)
             "(?:" + codes.join("|") + ")",  // %s
         ]
     }

     let pat = new RegExp( "(" + patterns.join("|") +")");

     let tokenized1 = formatStr.split(pat).filter((i) => i);
     let codePat = new RegExp("(" + codes.join("|") + ")");
     let tokenized2 = Array.from(tokenized1 , (x) => (x.split(codePat)))
     return Array.from(tokenized2, (i) => ({p: i[0], code: i[1], s: i[2]}))
    }


function _preprocess(inputStr){
//        Next, go through and do key-word replacement.
//        Just replace keywords with
//        %codes (ie, replace "firstname" with "%f", and
//        "FIRSTNAME" for %F)
    let formatStr = inputStr;
    const d = tokenMap;
    if ( formatStr.length > 2 && formatStr.charAt(0) === formatStr.slice(-1)
        && formatStr.charAt(0) === '"'){
        // pass
    } else {
        let dKeys = Array.from(d, ([name, value]) => ({code: name, keyword : value[1]}))
           // reverse sort on length and by keyword
           // in double quotes, just use % codes
        dKeys.sort(_cmpKey);
        for (const rec of dKeys){
            formatStr = formatStr.replace(rec.keyword, rec.code);
            formatStr = formatStr.replace(rec.keyword.charAt(0).toUpperCase() +
                rec.keyword.slice(1), rec.code);
            formatStr = formatStr.replace(rec.keyword.toUpperCase(), rec.code.toUpperCase())
        }
    }
    return formatStr;
}

 function _cleanupName(nameString){
    // Remove too long white space due to missing name parts,
    // so "a   b" becomes "a b" and "a , b" becomes "a, b"
    let parts = nameString.split(/\s+/)
        if (!parts)
            return "";
    let result = parts[0]
    for(const val of parts.slice(1)){
        if(val.length === 1 &&  [",", ";", ":", ARABIC_COMMA, ARABIC_SEMICOLON].includes(val)){
            result += val;
        } else {
            result += " " + val;
        }
    }
    return result;
}

// Singleton pattern
let instance;

export class NameDisplayer {

    constructor(nameFormats, defaultFormat){
        if(!instance){
            this.formatMap = new Map();
            this.defaultFormat = defaultFormat;
            for(const format of nameFormats){
                let formatStr = _preprocess(format.format)
                this.formatMap.set(format.number, {format : formatStr, tokens: _tokenize(formatStr)})
                if(format.number === this.defaultFormat)
                    this.formatMap.set(0, {format : formatStr, tokens: _tokenize(formatStr)});
            }
            instance = this;
        }
        return instance;
    };



//	get tokenized(){
//		return this._tokenized
//	}

    displayPersonPrimaryName(personObject){
       if(!personObject?.primary_name)
            return "";
       return this.display(personObject.primary_name, personObject.primary_name?.display_as);
    }


	display(nameObject, nameFormat){
        if (!nameObject)
            return "";
        nameFormat = typeof nameFormat !== undefined ? nameFormat : 0;

        const tokens = this.formatMap.get(nameFormat).tokens;
        if (!tokens)
            return nameObject.first_name + _rawPrimarySurname(nameObject);
		let output = "";
		for(const token of tokens){
            if (! token.code){
                output += token.p;
            } else {
			    let lower = token.code.toLowerCase();
				let nameElement = tokenMap.get(lower)[0](nameObject);
                if ( nameElement){
                    if (token.code === lower)
                        output += token.p + nameElement + token.s;
                    else
                        output += token.p + nameElement.toUpperCase() + token.s;
                    }
			}
		}
		return _cleanupName(output);
	}
}

//export function displayer(fmtStr){
//let   displayerObj = new nameDisplayer(fmtStr);

//let   mydisplayer = (nameObj) => displayerObj.display(nameObj);

//   return mydisplayer;
//}