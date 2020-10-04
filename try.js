const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0,0,500,500);   
    const positionY = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    const positionX = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    let movableY = {};  
    let movableX = {};  

    const drawMaze = (context) => {
        const visited = [];
        let xx = [];
        let yy = [];   
        context.fillStyle = 'darkslategray';
        context.fillRect(0, 0, 25, 25);     
        positionY[0][0] = 1; 
        positionX[0][0] = 1; 
        for (let k = 0; k < 350; k++) {
            context.fillStyle = 'darkslategray';
            const x_coordinate = (Math.round(Math.random() * 21));
            const y_coordinate = (Math.round(Math.random() * 21));
            context.fillRect(x_coordinate * 25, y_coordinate * 25, 25, 25);
            positionY[x_coordinate][y_coordinate] = 1;
            positionX[y_coordinate][x_coordinate] = 1;
        }  
        
        for (let index = 0; index < 6; index++) {
            for (let num = 0; num < 4; num++) {
                var randomNum = Math.random();  
                const rand = (randomNum < 0.5) ? randomNum = Math.floor(randomNum) : randomNum = Math.ceil(randomNum);
                console.log(rand);                  
                if (rand) {                       
                    xx.push(xx.length * 25);
                    context.fillStyle = 'darkslategray';
                    context.fillRect(xx.length * 25, yy.length * 25, 25, 25);
                    visited.push([xx.length * 25, yy.length * 25]);  
                    positionY[xx.length][yy.length] = 1;
                    positionX[yy.length][xx.length] = 1;
                }
                else {
                    yy.push(yy.length * 25);
                    context.fillStyle = 'darkslategray';
                    context.fillRect(xx.length * 25, yy.length * 25, 25, 25);
                    visited.push([xx.length * 25, yy.length * 25]);   
                    positionY[xx.length][yy.length] = 1;     
                    positionX[yy.length][xx.length] = 1;                               
                }
            }                           
        }         
        context.fillStyle = 'goldenrod';
        context.fillRect(visited[visited.length -1][0], visited[visited.length -1][1], 25, 25);     
        destinationX = visited[visited.length -1][0];
        destinationY = visited[visited.length -1][1];
    }

    drawMaze(context);     

    positionY.forEach(element => {
        element_movable = [];
        for (let i = 0; i < 22; i++) {
            if (typeof element[i] == 'undefined') {
                    element[i] = 0;
            }    
            element_movable.push(element.indexOf(1, i));          
        }
        let unique_elements = element_movable.filter((x, j, a) => a.indexOf(x) == j);  
        let uniqueness = [];
        unique_elements.forEach(ele => {
            if (ele !== -1) {
                uniqueness.push(ele * 25);
            }
        }); 
        movableY[`${positionY.indexOf(element) * 25}`] = uniqueness;        
    }); 
    
    positionX.forEach(element => {
        element_movable = [];
        for (let i = 0; i < 22; i++) {
            if (typeof element[i] == 'undefined') {
                    element[i] = 0;
            }    
            element_movable.push(element.indexOf(1, i));          
        }
        let unique_elements = element_movable.filter((x, j, a) => a.indexOf(x) == j);  
        let uniqueness = [];
        unique_elements.forEach(ele => {
            if (ele !== -1) {
                uniqueness.push(ele * 25);
            }
        }); 
        movableX[`${positionX.indexOf(element) * 25}`] = uniqueness;        
    }); 

    const moving_object = () => {
        const modifier = 25;
        window.addEventListener('keydown', (event) => {
            const { style } = box;
            switch(event.key) {
                case 'ArrowUp':                    
                    const topChecker = () => {
                        const keyUp = parseInt(style.left);                        
                        const proved_waysUp = movableY[keyUp];
                        (proved_waysUp.includes(parseInt(style.top) - modifier)) ? style.top = `${parseInt(style.top) - modifier}px` : style.top = `${parseInt(style.top)}px`; 
                        if (destinationX === parseInt(style.left) && destinationY === parseInt(style.top)) {
                            window.location.href = "i.html"
                        }
                    }
                    parseInt(style.top) < 5 ? style.top = `${0}px`  : parseInt(style.top) > 500 ? style.top = `${500}px` : topChecker();
                    break;
                case 'ArrowDown':
                    const bottomChecker = () => {
                        const keyDown = parseInt(style.left);                        
                        const proved_waysDown = movableY[keyDown];
                        (proved_waysDown.includes(parseInt(style.top) + modifier)) ? style.top = `${parseInt(style.top) + modifier}px` : style.top = `${parseInt(style.top)}px`; 
                        if (destinationX === parseInt(style.left) && destinationY === parseInt(style.top) ) {
                            window.location.href = "i.html"
                        }
                    }
                    parseInt(style.top) < 0 ? style.top = `${0}px`  : parseInt(style.top) >= 525 ? style.top = `${525}px` : bottomChecker();
                    break;
                case 'ArrowLeft':
                    const leftChecker = () => {
                        const keyLeft = parseInt(style.top);                        
                        const proved_waysLeft = movableX[keyLeft];
                        (proved_waysLeft.includes(parseInt(style.left) - modifier)) ? style.left = `${parseInt(style.left) - modifier}px` : style.left = `${parseInt(style.left)}px`; 
                        if (destinationX === parseInt(style.left) && destinationY === parseInt(style.top)) {
                            window.location.href = "i.html"
                        }
                    }
                    parseInt(style.left) < 5 ? style.left = `${0}px`  : parseInt(style.left) > 500 ? style.left = `${500}px` : leftChecker();
                    break;
                case 'ArrowRight':
                    const rightChecker = () => {
                        const keyRight = parseInt(style.top);                        
                        const proved_waysRight = movableX[keyRight];
                        (proved_waysRight.includes(parseInt(style.left) + modifier)) ? style.left = `${parseInt(style.left) + modifier}px` : style.left = `${parseInt(style.left)}px`; 
                        if (destinationX === parseInt(style.left) && destinationY === parseInt(style.top)) {
                            window.location.href = "i.html"
                        }
                    }
                    parseInt(style.left) < 0 ? style.left = `${0}px`  : parseInt(style.left) >= 525 ? style.left = `${525}px` : rightChecker();
                    break;                
            }                   
        }); 
    }
    moving_object();
     
    context.strokeStyle = 'black';
    context.strokeRect(0,0,500,500); 

    let timeoutHandle;
    function countdown() {
        let seconds = 31;
        let mins = 1;
        function tick() {
            let counter = document.getElementById("timer");
            let current_minutes = mins - 1;
            seconds -= 1 ;
            counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
            if( seconds > 0 ) {
                timeoutHandle = setTimeout(tick, 1000);
            } else {    
                if(mins > 1){    
                    // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
                    setTimeout(function () { countdown(mins - 1); }, 1000);                       
                }
                window.location.href = "ind.html";
            }
        }
        tick();
    }    
    countdown();
