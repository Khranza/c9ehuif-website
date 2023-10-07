    const textElement = document.getElementById('text')
    const optionButtonsElement = document.getElementById('option-buttons')
    const locationDisplayElement = document.getElementById('gameloc')
    const inventoryDisplayElement = document.getElementById('inventory')

    var i = 0;
    var speed = 10; // The speed/duration of the effect in milliseconds
    let color = ''; // Flag to indicate when to apply red text style

    let state = {

    }

    function startGame() {
        document.addEventListener('mousedown', (event) => {
            if (event.button === 0) {  // Check for the left mouse button (0)
                speed = 0;
                console.log('Speed:', speed);
            }
        });

        state = { gamelocation: 'Entrance' };
        showTextNode(101)
    }

    function typeWriter(textNode) {
        if (i < textNode.text.length) {
            if (textNode.text.charAt(i) === ' ') {
                textElement.innerHTML += ''; // Add a "mongolian vowel separator" after each space character if spaces disappear
            }

            if (textNode.text.charAt(i) === '~') {
                const colText = textNode.text.substring(i + 2).split('~')[0]; // Extract text to be red until the next ~
                if (textNode.text.charAt(i + 1) === 'r') { //red
                    textElement.innerHTML += `<span class="red-text">${colText}</span>`;
                }
                if (textNode.text.charAt(i + 1) === 'g') { //green
                    textElement.innerHTML += `<span class="green-text">${colText}</span>`;
                }
                i = i + 2 + colText.length;

            } else {
                textElement.innerHTML += textNode.text.charAt(i);
            }


            i++;

            console.log(speed);
            if (speed === 0) {
                typeWriter(textNode, 0); // Call recursively without delay
            } else {
                setTimeout(() => typeWriter(textNode), 0);  //delay for typewriter effect
            }

        } else {
            showButtons(textNode);
        }
    }

    var currentGameNode;

    function showTextNode(textNodeIndex) {
        if(textNodeIndex == -999) { //-999 means back
            textNodeIndex = currentGameNode;
        }
        
        speed = 10;
        const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
        i = 0
        textElement.innerText = ''; //clear existing text

        const isMonospace = textNode.id >= 20 && textNode.id <= 70;
        if (isMonospace) {
            textElement.style.fontFamily = 'Courier New, monospace';
            textElement.style.fontSize = '18px';
        } else {
            textElement.style.fontFamily = ''; // Reset font-family for other texts
            textElement.style.fontSize = '21px';
            currentGameNode = textNodeIndex;
        }


        while (optionButtonsElement.firstChild) {
            optionButtonsElement.removeChild(optionButtonsElement.firstChild)
        }
        
        if (state.gamelocation) {
            locationDisplayElement.innerText = state.gamelocation;
        }
        // if showInventory 
            // Create a button element for inventory
            inventoryDisplayElement.innerHTML = "";

            const inventoryButton = document.createElement('button');
            inventoryButton.innerText = 'Inventory';
            inventoryButton.classList.add('invbtn');
            inventoryButton.addEventListener('click', () => showTextNode(1)); // Add event listener for showing inventory
            inventoryDisplayElement.appendChild(inventoryButton);

        typeWriter(textNode)

        
    }

    function showButtons(textNode) {
        textNode.options.forEach(option => {
            if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
            }
        })
    }

    function showOption(option) {
        return option.requiredState == null || option.requiredState(state)
    }

    function selectOption(option) {
        const nextTextNodeId = option.nextText 
        state = Object.assign(state, option.setState)
        showTextNode(nextTextNodeId)
    }

    const textNodes = [
        {   //inventory
            id: 1,
            text: "Inventory",
            options: [
                {
                    text: '•  Letter from Ricky',
                    nextText: 20,
                },
                {
                    text: '',       //spacing
                },
                {
                    text: '',
                },
                {
                    text: '',
                },
                {
                    text: '',
                },
                {
                    text: '← Back',
                    nextText: -999
                }
            ]
        },
        /////// ITEMS
        {
            id: 20,
            text: `________________________________________________________
︳                                                      ︳
︳           Re: Re: Urgent personal matter             ︳
︳                                                      ︳
︳ Paul,                                                ︳
︳                                                      ︳
︳ I understand your concern and hesitation, I really   ︳
︳ do, and I know we haven't been on the best terms     ︳
︳ lately. But I really feel like I can finally turn    ︳
︳ this mess around.                                    ︳
︳ I only need concrete proof— a picture of an          ︳
︳ overgrown garden, or of items left behind, that      ︳
︳ kinda thing. You know you're the only one I can      ︳
︳ trust with this.                                     ︳
︳ So I'm asking you, not just as a client but as your  ︳
︳ friend— please do this for me.                       ︳
︳                                                      ︳
︳ Here's the address, in case you change your mind:    ︳    
︳ 106 Waterfront Estate, Lane of Apollo                ︳
︳                                                      ︳                                                 
︳ Your friend,                                         ︳
︳ Ricky                                                ︳
︳                                                      ︳                                                 
————————————————————————————————————————————————————————
`,
            options: [
                {
                    text: `← Back`,
                    nextText: 1,
                }
            ]

        },




        {
            id: 101,
            text: "In front of you stands a large metal gate covered in vines. It doesn't have a handle but is slightly ajar.",
            options: [
                {
                    text: '•  Push the gate open',
                    nextText: 102
                },
            ]
        },
        {
            id: 102,
            text: 'The gate creaks loudly as you push it open.',
            options: [
                {
                    text: '...', 
                    nextText: 103
                },
            ]
        },
        {
            id: 103,
            text: "The view beyond the gate reveals a garden entirely overrun by weeds and decay. It is clear no one has tended to it for years.",
            options: [
                {
                    text: '...', 
                    nextText: 104
                },
            ]
        },
        {
            id: 104,
            text: 'A barely discernible footpath stretches out in front of you, leading deep into the garden and toward the house.',
            options: [
                {
                    text: '•  Enter the garden', 
                    setState: {gamelocation: 'Garden'},
                    nextText: 201
                },
            ]
        },
        {
            id: 202.1,
            text: 'A narrow trail branches off the main path, leading deeper into the garden.',
            options: [
                {
                    text: '•  Keep walking toward house', 
                    nextText: 401
                },
                {
                    text: '•  Follow trail', 
                    nextText: 203
                }
            ]
        },
        {
            id: 202.2,
            text: 'While walking back toward the gate, you notice a narrow trail branching off the main path, leading deeper into the garden.',
            options: [
                {
                    text: '•  Keep walking toward gate', 
                    nextText: 204
                },
                {
                    text: '•  Follow trail', 
                    nextText: 203
                }
            ]
        },
        {
            id: 202.3,
            text: 'While walking back toward the gate you notice a narrow trail branching off the main path, leading deeper into the garden.',
            options: [
                {
                    text: '•  Keep walking toward gate', 
                    nextText: 401
                },
                {
                    text: '•  Follow trail', 
                    nextText: 203
                }
            ]
        },
        {
            id: 202.4,
            text: 'The trail ends at a crossroads: right leads toward the house, left to the gate.',
            options: [
                {
                    text: '•  Walk toward gate', 
                    nextText: 204
                },
                {
                    text: '•  Walk toward house', 
                    nextText: 401
                }
            ]
        },
        {
            id: 202.5,
            text: 'The trail ends at a crossroads: right leads toward the house, left to where the gate once was.',
            options: [
                {
                    text: '•  Walk toward gate', 
                    nextText: 99999999999 //gate has been found missing
                },
                {
                    text: '•  Walk toward house', 
                    nextText: 401
                }
            ]
        },
        {
            id: 201,
            text: 'You step through the gate, onto the grassy path before you.',
            options: [
                {
                    text: '...', 
                    nextText: 401
                }
            ]
        },
        {
            id: 203,
            text: `You follow the trail toward a concealed wooden structure. Though close to the main house, you hadn't noticed the building before, thanks to the dense bushes surrounding it.`,
            options: [
                {
                    text: '...',
                    setState: {gamelocation: 'Garden shed'},
                    nextText: 302
                }
            ]
        },
        {
            id: 204,    //gate is missing, path abruptly ends
            text: `You walk toward the gate.`,
            options: [
                {
                    text: '...',
                    nextText: 205
                }
            ]
        },
        {
            id: 205,    //gate is missing, path abruptly ends
            text: `On the same exact path you walked on before. Only this time, it's not the exact same path. Something changed.`,
            options: [
                {
                    text: '...',
                    nextText: 206
                }
            ]
        },
        {
            id: 206,    //gate is missing, path abruptly ends
            text: `Before you can figure out what, the footpath abruptly ends at the house's perimeter fence, with no gate to be seen.`,
            options: [
                {
                    text: '...',
                    nextText: 207
                }
            ]
        },

        {
            id: 207,    //gate is missing, path abruptly ends
            text: `Your heart pounding, you decide to walk back the way you came, towards the crossroads. Something is horribly wrong with this place.`,
            options: [
                {
                    text: '...',
                    setState: {FoundMissingDoor: true},
                    nextText: 202.1
                }
            ]
        },
        
            //301 is missing
        {
            id: 302,
            text: `The path ends at the shed's door, and a window is fitted just to its right.`,
            options: [
                {
                    text: '•  Enter through door',  //first time trying out
                    requiredState: (currentState) => !currentState.TriedShedDoor,
                    setState: {TriedShedDoor: true},
                    nextText: 303
                },
                {
                    text: '•  Enter through door',  //more times trying out
                    requiredState: (currentState) => currentState.TriedShedDoor,
                    nextText: 304  
                },
                {
                    text: '•  Peek through window', //first
                    requiredState: (currentState) => !currentState.PeekedShedWindow,
                    setState: {PeekedShedWindow: true},
                    nextText: 305
                },
                {
                    text: '•  Peek through window', //more
                    requiredState: (currentState) => currentState.PeekedShedWindow,
                    nextText: 306
                },
                {
                    text: '•  Walk back toward main path',  //hasnt found missing door
                    setState: {gamelocation: 'Garden'},
                    requiredState: (currentState) => !currentState.FoundMissingDoor,
                    nextText: 202.4
                },
                {
                    text: '•  Walk back toward main path',  //has found
                    setState: {gamelocation: 'Garden'},
                    requiredState: (currentState) => currentState.FoundMissingDoor,
                    nextText: 202.5
                }
            ]
        },
        {
            id: 303,
            text: `You reach for the rusty doorhandle. It rotates surprisingly smoothly, but the door doesn't move an inch. It's locked.`,
            options: [
                {
                    text: '...',  
                    nextText: 302
                }
            ]
        },
        {
            id: 304,
            text: `It's locked`,
            options: [
                {
                    text: '...',  
                    nextText: 302
                }
            ]
        },
        {
            id: 305,
            text: `You try to peek through the shed's dusty window, holding on to its weathered wooden sill...`,
            options: [
                {
                    text: '...',  
                    nextText: 306
                }
            ]
        },
        {
            id: 306,
            text: `...but the sharp sunlight reflecting into your eyes blinds you. You shift your view to get a better look...`,
            options: [
                {
                    text: '...',  
                    nextText: 307
                }
            ]
        },
        {
            id: 307,
            text: `Something catches your eye. It's your our reflection of all things. It seems off, somehow.`,
            options: [
                {
                    text: '...',  
                    nextText: 308
                }
            ]
        },
        {
            id: 308,
            text: `That's when you notice ~rit~.`,
            options: [
                {
                    text: '...',  
                    nextText: 309
                }
            ]
        },
        {
            id: 309,
            text: `What you're looking at is not your refleciton.
            A tall figure stands on the other side of the glass, staring right back into your eyes.`,
            options: [
                {
                    text: 'end of demo',  
                    nextText: 310
                }
            ]
        },
        {
            id: 401,
            text: `As the path makes a gradual turn to the left, the foliage clears, allowing for a better look at the house's features.`,
            options: [
                {
                    text: ' ᵢ House',  
                    nextText: 401.1
                },
                {
                    text: '•  Keep walking towards house', 
                    setState: {gamelocation: 'Back entrance'},
                    nextText: 401.9 
                }

            ]
        },
        {   // i of house
            id: 401.1,
            text: `The house is almost unrecognizeable from the pictures you were shown.`,
            options: [
                {
                    text: '...',  
                    nextText: 401.2
                }
            ]
        },
        {   
            id: 401.2,
            text: `Ivy creeps up its wooden walls, once painted white; now weathered and gray, and most of the windows are boarded up.`,
            options: [
                {
                    text: '...',  
                    nextText: 401.3
                }
            ]
        },
        {
            id: 401.3,
            text: `It doesn't look like anyone has been in this place for years, let alone lived in it.`,
            options: [
                {
                    text: '...',  
                    nextText: 401
                }
            ]
        },
        {
            id: 401.9,
            text: `The footpath ends at the buildings back entrance, where a wooden door rests atop a wide, moss-covered doorstep.`,
            options: [
                {
                    text: '...',  
                    requiredState: (currentState) => !currentState.HasKnockedBackDoor,
                    nextText: 402
                },
                {
                    text: '...',  
                    requiredState: (currentState) => currentState.HasKnockedBackDoor,
                    nextText: 407
                }
            ]
        },
        {
            id: 402,
            text: `There is no doorbell to be found.`,
            options: [
                {
                    text: '•  Knock', 
                    requiredState: (currentState) => !currentState.HasKnockedBackDoor,
                    setState: {HasKnockedBackDoor: true},
                    nextText: 403
                },
                {
                    text: '•  Yell',  
                    setState: {HasYelledBackDoor: true},
                    requiredState: (currentState) => !currentState.HasYelledBackDoor,
                    nextText: 405
                }
            ]
        },
        {
            id: 403,
            text: `You pound your fist on to the door as hard as you can. The sound reverberates in the room beyond, before dying down completely.`,
            options: [
                {
                    text: '...',  
                    nextText: 404
                }
            ]
        },
        {
            id: 404,
            text: `No response.`,
            options: [
                {
                    text: '...',  //first time (knock/yell)
                    requiredState: (currentState) => !currentState.HasYelledBackDoor,
                    nextText: 402
                },
                {
                    text: '...',  //more times
                    requiredState: (currentState) => currentState.HasYelledBackDoor,
                    nextText: 408
                }
            ]
        },
        {
            id: 405,
            text: `"Is anyone home?" You yell.`,
            options: [
                {
                    text: '...',  
                    nextText: 406
                }
            ]
        },
        {
            id: 406,
            text: `"..."`,
            options: [
                {
                    text: '...',  
                    nextText: 407
                }
            ]
        },
        {
            id: 407,
            text: `Looks like no one is home.`,
            options: [
                {
                    text: '...',  
                    requiredState: (currentState) => !currentState.HasKnockedBackDoor,
                    nextText: 402
                },
                {
                    text: '...',  
                    requiredState: (currentState) => currentState.HasKnockedBackDoor,
                    nextText: 408
                }
            ]
        },
        {
            id: 408,
            text: `You decide to take one more look around the garden.`,
            options: [
                {
                    text: '...',  
                    setState: {gamelocation: 'Garden'},
                    nextText: 202.2
                }
            ]
        },
        

    ]

    startGame()