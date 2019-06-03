# Aulos

## Install

### Prerequisites
1. have nodeJS + npm installed (CURRENT VERSION) => https://nodejs.org/en/
2. have git installed => https://git-scm.com/downloads

### Steps
1. download the repo on your pc by typing ``git clone https://github.com/mightytyphoon/midi midi`` in command line (cmd, terminal) (needs to have git cli)
2. go in the midi directory and run : ``npm i`` in cmd/terminal this will install all dependencies
   1. note : postinstall of nw && ng can be long, be patient
3. run the program with : 
   1. ``npm run dev``
   2. ``npm start`` still in terminal
4. the save will be originalFileName.mid => originalFileName-transposee.mid at the same place


## Installation

![alt text](https://i.ibb.co/ZNMK5qs/Sans-titre.png)

### Prérequis
1. avoir installé nodejs et npm (CURRENT VERSION) => https://nodejs.org/en/
2. avoir installé git => https://git-scm.com/downloads

### Steps
1. ouvrir l'invite de commandes / le terminal (mac) et se placer à l'endroit désiré pour le téléchargement
2. télécharger le repository en tapant ``git clone https://github.com/mightytyphoon/midi midi`` dans l'invite de commandes (windows) ou le terminal (mac)
   1. note : la post-installation de nw peut être longue.
3. 
4. aller dans le répertoire téléchargé en tapant `` cd midi``
5. puis taper ``npm i`` dans le terminal/invite de commande windows pour installer les dépendances
6. lancer le programme avec : ``npm start``
7. le fichier sauvegardé se trouvera dans le meme repertoire que celui d'origine avec -transposee en plus dans le nom


# Improvements

1. Interface & app (angular)
2. Select tracks
3. Higher Octave steps
4. Save Transpositions
5. View Midi file
6. Change name from transposee to substitution (Harmonie Negative Substitution) in code (already done in package)

# Bugs
1. add track
2. sometimes delete notes
3. sometimes doesn't change notes
4. ADD MIDI CORRESPONDANCE
   1. par exemple pour aller de Mi à Sol c'est +3 normalement
    et si on ajoute une octave
    c'est +12 en plus