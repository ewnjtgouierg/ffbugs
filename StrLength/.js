Object.defineProperty(String.prototype, "charRealPos", {
  value: [],
  writable: true,
});
Object.defineProperty(String.prototype, "chars", {
  value: [],
  writable: true,
});
String.prototype.trueCharAt = function (i) {
		if (this.length == this.trueLength)
    		return this.charAt(i);
    	return this.chars[i];
    };
Object.defineProperty(String.prototype, "trueLength", {
    get: function () {

		var diacritics = [];

    	var withoutCDM = this.replace(/[^\u0300-\u036F][\u0300-\u036F]+/g, function(match, offset)
			{
				diacritics.push({
					length: match.length,
					content: match,
						});
				return "\u0300";
			});

		this.charRealPos.length = 0;

		var chars = Array.from(withoutCDM);

		var pos = 0;

		this.chars.length = 0;

		for (var v of chars)
			{
				if (v == "\u0300")
					v = diacritics.shift().content;
				this.charRealPos.push(pos);
				pos += v.length;
				this.chars.push(v);
			};

		this.charRealPos.push(pos);

		return chars.length;
    }
});
String.prototype.trueSubstring = function(start, end)
	{
		this.trueLength;
		var chars = this.chars.slice(start, end);
		return chars.join('');
	};
var str = "😊⚓a\u0300\u0301\u0302😍b\u0303⚓";
console.log(str.trueSubstring(0,2));
console.log(str.trueLength);
console.log(str.charRealPos);
console.log(str.chars);
str = "⚓".repeat(12);
console.log(str.trueLength);
console.log(str.charRealPos[11]);