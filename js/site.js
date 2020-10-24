
function allQueries(filename) {
    let all = ['future','thing','theme']
    for (const ind in all) {
        queryCSV(all[ind],filename)
    }
}

function chooseMod(mod,mods) {
    let params = mods[mod]
    let overrides = Object.keys(params.overrides);
    let all = ['future','thing','theme']
    for (const ind in all) {
        document.getElementById(all[ind]).className = ''
    }

    for (let override in overrides){
        document.getElementById(overrides[override]).innerHTML = params.overrides[overrides[override]]
        document.getElementById(overrides[override]).className = 'lock'
    }

    filename = params.file;

    allQueries(filename)
}

function queryCSV(text_id,filename) {

    let file = 'assets/' + filename
    d3.csv(file).then(function (data) {
        let flag = true;
        let inner_flag;
        let row;
        let str = text_id.split('-');
        let output;
        let freq;


            // Create bag of words (to account for frequency)
            let bag = [];
            let data_;
            let word;
            let components;
            for (const r in data) {
                data_ = data[r][str[0]]
                if (data_ != undefined && data_ != []) {
                    if (data_.split(' (').length == 2) {
                        components = data_.split(' (')
                        word = components[0];
                        freq = components[1].split(')')[0]
                        for (let i = 0; i < freq; i++) {
                            bag.push(word)
                        }
                    } else{
                        bag.push(data_)
                    }
                }
            }

            while (flag) {
                row = Math.floor(Math.random() * bag.length);
                output = bag[row]
                if (output != '') {
                    flag = false;
                    let el = document.getElementById(text_id)
                    if (el.className != 'lock') {
                        if (output == 'a D.I.Y. Kit') {
                            el.innerHTML = 'a D.I.Y kit';
                        } else {
                            el.innerHTML = output.toLowerCase();
                        }
                    }
                }
            }
        // updatePrompt();
    })
}

// function updatePrompt() {
//     let all = ['future', 'thing', 'theme']
//     let text = [];
//     text.push(document.getElementById('future1').innerHTML)
//     text.push(document.getElementById('future').innerHTML.toLowerCase())
//     text.push(document.getElementById('future2').innerHTML.toLowerCase() + ',')
//     text.push(document.getElementById('thing1').innerHTML.toLowerCase())
//     text.push(document.getElementById('thing').innerHTML.toLowerCase())
//     text.push(document.getElementById('theme1').innerHTML.toLowerCase())
//     text.push(document.getElementById('theme').innerHTML.toLowerCase() + '.')
//     text.push(document.getElementById('theme2').innerHTML)
//
//
//     let prompt = text.join(' ')
//     document.getElementById('Prompt').innerHTML = prompt
// }
