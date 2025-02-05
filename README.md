# Wilde Tiere

Hier ist ein Svelte-Projekt zu dem Modul Programmiersprachen III bei Fabian Rauch. Hier geht es um eine interaktive und immersive Erdkugel, worauf man die unterschiedlichsten Tierarten entdecken kann.

![Vogel](/public/wallpaper.png)

## Must Have

- Integration einer API
    - Ollama für die Kommunikation mit der lokalen LLM (Llama)
    - Wikipedia zum Einbinden echter Wikiinfos zu jedem Tier in der Infobox
- Verwendung von Svelte-Komponenten
    - Erde mit einer THREE.js Kugel
    - UI für die Kommunikation mit der Erdkugel (Infobox + HTML-Marker)
    - Tiere mit ihren GLTF Dateien
- Mindestens zwei verschiedene Unterseiten / -bereiche, die mittels Routing integriert sind
    - `/` Homeansicht mit der Weltkarte, einem Input-Eingabefeld, dem Toogle Button für die Tag/Nacht Version und den Tiere, bei denen sich durch anklicken ein Overlay öffnet das dir Daten zu dem jeweiligen Tier gibt.
	- `/quiz`: Jeopardy Spiel das man mit einem Freund spielen kann.
	- `/start`: Für die allgemeine Info sieht man hier eine kleine Erlärung zu den Seiten und kann auch von hier über einen Button direkt zu den einzelnen Seiten.
	- `/about`: About alle Tiere in der Übersicht, die man hier auch schon direkt liken kann und als Favouriten gespeichert werden
- Verwendung üblicher Website-Bestandteile (Header, Navigationsleiste, etc.)
    - Auf allen Seiten ist eine Header mit der Nav zu sehen, über die Nav kann man auf die Weltkugel, das Quiz und die Tiere zugreifen. Im Footer befinden sich die Daten zum Kurs. Zudem gibt es eine Startseite die dir zeigt wie diese Webseite aufgebaut ist. 
- Lauffähiges Programm
    - Das Programm ist lauffähig.

## Should Have

- Flowchart / Wireframes / o. Ä., die vor der technischen Umsetzung erstellt werden
    - Alle Flowcharts und Wireframes wurden während den Besprechungen gezeigt.
- Responsive Design (1 Breakpoint → Mobile / Desktop)
    - Alle Seiten sind auch über die Mobile Version sichtbar und bedienbar.
- sinnvoller Einsatz von `grid` / `flex`
    - Grid und Flex wurde sinnvoll auf den Seiten eingesetzt.

## Could Have 
- Nutzung und Kombination mehrerer APIs (z. B. Wikipedia, NASA, etc.)
    - Ich habe in meiner App die API von Wikipedia eingebaut um mehr Informationen über die Tiere zu bekommen. 
    - Mit der Suchleiste kan man über natürlich sprachige Suche mit dem Datensatz "kommuizieren", in dem mittels Function Calling auf vordefinierte Funktionierte zugegriffen und auf den Datensatz angewandt wird. Mit der Lokalen KI laufen kleine aber auch performante LLMs direkt auf dem Computer und damit mit möglichst geringer Latenz. [llama3.2:3b](https://ollama.com/library/llama3.2:3b)

- Integration von KI-APIs wie z. B. OpenAI
    - [Ollamas angebotene API für JavaScript](https://github.com/ollama/ollama-js)

- Speichermöglichkeiten z. B. via localStorage
    - Man kann seine Lieblingstiere abspeichern und dort jederzeit  wiedersehen.

- Spielmöglichkeit mit dem Computer
    - In natürlicher Sprache mit dem Computer interagieren, es ist möglich mit dem Datensatz zu sprechen. Der Computer hat die Möglichkeit mir meine Suchanfragen auszuführen.

- 3D Tiere
    - Einbinden von 3D-Tieren im Overlay der jeweiligen Tiere

- Tag und Nacht Funktion
    - Möglichkeit zu sehen welche Tiere bei Nacht und bei Tag aktiv sind durch einen einfachen Klick über den Toogle Button.

- Spielspaß mit deinen Freunden oder der ganzen Familie
    - Spiele mit deinem Freund und schaut euch die einzelnen Tiere auf der Weltkarte an, geht mit diesem Wissen ans Quiz und beantwortet die Fragen richtig. Viel Spaß bei Lösen! (Hier kann man den Spielstand verfolgen, man sieht werd gerade am Zug ist, es läuft unterhaltende Jeopardy Musik im Hintergrund und am Ende gibt es einen glücklichen Gewinner.)

- TailwindCSS 

## Externe Libs
- lucide.svelte für die Icons 
- pico.css für grundlegendes Styling
- globe.gl für die Weltkugel
- ldrs für Ladeanimationen
- mode-watcher für Dark/Light Theme
- normalize.css für klassisches CSS-Reset
- ollama für lokale KI
- svelte-spa-router für Single Page Applications (SPA)
- topojson-client für die Polygone der Landmassen der Weltkugeln
- [3D Modelle von Sketchfab](https://sketchfab.com/feed)

## Future outlook
- Die Intergrierung von der IUCN API, es wurde bereits ausprobiert, aber sie sind gerade bei einer Umstellung von v3 auf v4.
- Weitere 3D-Tiere einfügen.
- Mehr Tiere auf der Weltkarte.
- Eigene Tiere auf der Weltkarte hinzufügen (für Nutzer wenn ein Tier fehlen sollte, gibt ja sehr viele) 
- Weitere Funktionen für die Suchabfragen mit Ollama, weitere Kriterien, Abfragen 


# Meine Themenideen
- Weltkugel mit anklickbaren Tieren zu denen Infos angezeigt werden.
- Suchfunktion über olama über die Daten im Datensatz.
- Jeopardy Spiel Erlebnis für Groß und Klein.
- Ansicht aller Tiere, hier kann man auch seine liebsten Tiere für sich favorisieren.

## Installation

- `node_modules` installieren
- [Ollama](https://ollama.com) installieren und Modell [llama3.2:3b](https://ollama.com/library/llama3.2:3b) herunterladen