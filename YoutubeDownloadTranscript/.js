new class {
		constructor()
			{
				if (this.transcriptDownloadID) return;
				this.transcriptDownloadID = setInterval(this.tryDownloadTranscript.bind(this), 100);
				document.querySelector("#primary-button").querySelector('button').click();
			}

		tryDownloadTranscript()
			{
				var text = document.querySelector('.segment-text.style-scope.ytd-transcript-segment-renderer')?.parentNode?.parentNode?.parentNode?.innerText;
				if (!text) return;
				clearInterval(this.transcriptDownloadID);
				delete this.transcriptDownloadID;

				text = text.replace(/\d+:\d+(:\d+)?/gsm, '');
				text = text.replaceAll("\n\n", ' ');

				var separator = '. ';
				var counter = 0;
				var line, lines = text.split(separator);
				text = '';

				while (line = lines.shift())
					{
						if (counter) text += separator;
						text += line;
						counter++;
						if (counter == 5)
							{
								counter = 0;
								text += "\n\n";
							}
					}

				this.download(text);
			}

		download(text)
			{
				var el = document.createElement('a');
				el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));

				var filename = document.querySelector('h1.ytd-watch-metadata')?.innerText?.trim();
				if (!filename) filename = (new URLSearchParams(location.search)).get('v');
				el.setAttribute('download', filename + '.txt');

				el.style.display = 'none';
				document.body.appendChild(el);

				el.click();

				document.body.removeChild(el);
			}
	}();
