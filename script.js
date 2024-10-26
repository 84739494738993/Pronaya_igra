// Создание сцены
const scene = new THREE.Scene();
let count = parseInt(localStorage.getItem('collisionCount')) || 0;
let count1 = parseInt(localStorage.getItem('collisionCount1')) || 0;
let count2 = parseInt(localStorage.getItem('collisionCount2')) || 0;
let Level = parseInt(localStorage.getItem('collisionCount3')) || 0;
let target= parseInt(localStorage.getItem('collisionCount4')) || 10;
let sklad = parseInt(localStorage.getItem('collisionCount5')) || 0;
let griby = parseInt(localStorage.getItem('collisionCount6')) || 0;
let Level2 = parseInt(localStorage.getItem('collisionCount7')) || 0;
let money = parseInt(localStorage.getItem('collisionCount8')) || 0;

let apl = 0;
let pal = 0;
let gri =0;
let finish = 0;
let B = 0;





// Создание камеры
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 90;
camera.position.y = 3;
camera.lookAt(0, 0, 0);

// Создание рендера
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x7EC850); // Устанавливаем зелёный фон для поля
document.body.appendChild(renderer.domElement);

// Добавление освещения
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10).normalize();
scene.add(light);

const models = new THREE.Group();

const hedgehog = new THREE.Group();

// Создание тела ежика
const bodyGeometry = new THREE.BoxGeometry(1, 0.5, 1);
const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
hedgehog.add(body);

// Создание головы ежика
const headGeometry = new THREE.ConeGeometry(0.25, 0.5, 32);
const headMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
const head = new THREE.Mesh(headGeometry, headMaterial);
// Установка позиции головы спереди тела
head.position.set(0, 0.1, 0.7);
head.rotation.x = Math.PI / 2;
hedgehog.add(head);

// Создание глаз ежика
const eyesGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const eyesMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
const eyes = new THREE.Mesh(eyesGeometry, eyesMaterial);
eyes.position.set(0.1, 0.27, 0.5);
hedgehog.add(eyes);

const eyes2Geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const eyes2Material = new THREE.MeshPhongMaterial({ color: 0x000000 });
const eyes2 = new THREE.Mesh(eyes2Geometry, eyes2Material);
eyes2.position.set(-0.1, 0.27, 0.5);
hedgehog.add(eyes2);

// Создание носа ежика
const noseGeometry = new THREE.SphereGeometry(0.05, 16, 16);
const noseMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
const nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.position.set(0, 0.12, 0.93);
hedgehog.add(nose);

scene.add(hedgehog);

// Функция для создания и добавления колючек
function addThorns() {
    const thornGeometry = new THREE.ConeGeometry(0.05, 0.2, 8);
    const thornMaterial = new THREE.MeshPhongMaterial({ color: 0x2F4F4F });

    const numThorns = 4000;
    for (let i = 0; i < numThorns; i++) {
        const thorn = new THREE.Mesh(thornGeometry, thornMaterial);

        // Случайное размещение колючек на верхней поверхности прямоугольника
        const x = (Math.random() - 0.5) * (bodyGeometry.parameters.width - 0.1); // Уменьшение по ширине
        const y = bodyGeometry.parameters.height / 2; // Установка на верхней поверхности тела
        const z = (Math.random() - 0.5) * (bodyGeometry.parameters.depth - 0.1); // Уменьшение по глубине

        thorn.position.set(x, y, z);
        // Колючки направлены вверх острыми концами по умолчанию (не нужно изменять rotation)

        body.add(thorn); // Прикрепление колючек к телу
    }
}

// Добавление колючек к телу ежика
addThorns();











// // Создаем треугольную шляпу (конус)
// function adgfytuyiu(){
//  const hatGeometry = new THREE.BoxGeometry(50, 100, 32);
// const hatMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
// const hat = new THREE.Mesh(hatGeometry, hatMaterial);
// hat.position.set(0, 0, 0);
// scene.add(hat);   
// }
// adgfytuyiu(0,0,0)



















// Функция для создания дерева
const treeGroup = new THREE.Group();
const treeGeometry = new THREE.CylinderGeometry(1, 1, 2); // уменьшил размеры ствола
const treeMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
const tree = new THREE.Mesh(treeGeometry, treeMaterial);
tree.position.set(0, 0, 0); 
// ствол будет стоять на плоскости
const duploGeometry =  new THREE.BoxGeometry(0.1, 1, 1);
const duploMaterial =  new THREE.MeshPhongMaterial({color:0x2F4F4F})
const duplo = new THREE.Mesh(duploGeometry,duploMaterial)
duplo.position.set(1,-0.4,0)
treeGroup.add(duplo);
treeGroup.add(tree);
treeGroup.position.set(10,0,2)
scene.add(treeGroup);



// Функция для генерации случайных координат
function generateRandomCoordinates() {
    return {
        x: Math.random() * 60 - 20,
        y: 0,
        z: Math.random() * 60 - 20
    };
}

// Функция для создания травы
function createGrass() {
    const geometry = new THREE.BoxGeometry(0.05, 0.05, 0.4);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    for (let i = 0; i < 700; i++) {
        const grassBlade = new THREE.Mesh(geometry, material);
        grassBlade.position.set(
            Math.random() * 70 - 20,
            0,
            Math.random() * 70 - 20
        );
        grassBlade.rotation.x = -Math.PI / 2;
        scene.add(grassBlade);
    }
}
const treGroup = new THREE.Group();
const treePositions = [];
const minDistanceFromHedgehog = 1;
const minDistanceFromTreGroup = 1;
const minDistanceFromAPL = 10;

// Функция для создания дерева
function createTree(x, y, z) {

// Инициализация групп деревьев и яблок с использованием Vector3
const apllesGroup = new THREE.Vector3(10, 0, 9);
const treeGroup = new THREE.Vector3(10, 0, 2);


const hedgehogPosition = new THREE.Vector3(hedgehog.position.x, hedgehog.position.y, hedgehog.position.z);

// Минимальные расстояния (предположим, что они определены)
const minDistanceFromHedgehog = 5;
const minDistanceFromTreeGroup = 5;
const minDistanceFromAPL = 5;

const newPosition = new THREE.Vector3(x, y, z);

// Проверка расстояния до ежа
if (hedgehogPosition.distanceTo(newPosition) < minDistanceFromHedgehog) {
    return; // Если расстояние меньше минимального, не создаем дерево
}
// Проверка расстояния до группы деревьев
if (treeGroup.distanceTo(newPosition) < minDistanceFromTreeGroup) {
    return; // Если расстояние меньше минимального, не создаем дерево
}
// Проверка расстояния до группы яблок
if (apllesGroup.distanceTo(newPosition) < minDistanceFromAPL) {
    return; // Если расстояние меньше минимального, не создаем дерево
}
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3);
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, y + 1, z);
    const leavesGeometry = new THREE.SphereGeometry(2, 0);
    const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(x, y + 4, z);
    treGroup.add(trunk)
    treGroup.add(leaves)
    scene.add(treGroup);
    treePositions.push({ x, z });
   
}
//  console.log(treePositions);

const aplles1 = [];
const apllesGroup = new THREE.Group();
scene.add(apllesGroup);

function createAplle(x, y, z) {
    const aplleGroup = new THREE.Group();

    const Geometryapll = new THREE.SphereGeometry(0.2, 8, 8);
    const Materialapll = new THREE.MeshBasicMaterial({ color: "#9f160b" });
    const aplle = new THREE.Mesh(Geometryapll, Materialapll);
    aplleGroup.add(aplle);

    const GeometryStick = new THREE.BoxGeometry(0.05, 0.2, 0.05);
    const MaterialStick = new THREE.MeshBasicMaterial({ color: "#4f0b06" });
    const stick = new THREE.Mesh(GeometryStick, MaterialStick);
    aplleGroup.add(stick);
    stick.position.set(0, 0.3, 0);

    const GeometryLeaf = new THREE.BoxGeometry(0.15, 0.2, 0.07);
    const MaterialLeaf = new THREE.MeshBasicMaterial({ color: "#8ff246" });
    const Leaf = new THREE.Mesh(GeometryLeaf, MaterialLeaf);
    aplleGroup.add(Leaf);
    Leaf.position.set(0.07, 0.45, 0);

    aplleGroup.position.set(x, y, z);

    apllesGroup.add(aplleGroup);
    aplles1.push(aplleGroup);
}

function createRandomApple() {
    const newCoords = generateRandomCoordinates();
    createAplle(newCoords.x, newCoords.y, newCoords.z);
}


// Пример создания одного яблока при инициализации
createAplle(10, 0, 9);


const palkaGroup = new THREE.Group();
scene.add(palkaGroup);

function createPalka(x, y, z) {
    // Создание первой палки
    const palkaGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.6);
    const palkaMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const palka = new THREE.Mesh(palkaGeometry, palkaMaterial);
    palka.position.set(x, y, z);
    palka.rotation.x = Math.PI / 4;
    palka.rotation.z = Math.PI / 2;

    // Создание второй палки
    const mpalkaGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4);
    const mpalkaMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const mpalka = new THREE.Mesh(mpalkaGeometry, mpalkaMaterial);
    mpalka.position.set(x, y, z + 0.1); // Корректное позиционирование относительно первой палки
    mpalka.rotation.y = Math.PI / 6; // Поворот на 30 градусов
    mpalka.rotation.z = Math.PI / 2;

    // Добавление палок в группу
    palkaGroup.add(palka);
    palkaGroup.add(mpalka);
}

function createRandomPalka() {
    const newCoords = generateRandomCoordinates();
    createPalka(newCoords.x, newCoords.y, newCoords.z);
}

// Установка позиции группы хвороста при инициализации
createPalka(10, 0, 8);




// Массив для хранения грибов
const mushrooms = [];

function createMushrooms(x, y, z) {
    // Создаем ножку гриба
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
    const legMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(x, y , z); // Поднимаем ножку на половину высоты

    // Создаем шляпку гриба
    const hatGeometry = new THREE.SphereGeometry(0.3, 6, 8);
    const hatMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Коричневая шляпка
    const hat = new THREE.Mesh(hatGeometry, hatMaterial);
    hat.position.set(x, y + 0.3, z); // Положение шляпки над ножкой

    // Добавляем гриб в массив
    mushrooms.push({ leg, hat });

    scene.add(leg);
    scene.add(hat);
    
}

// Создание грибов
createMushrooms(10,0,10); // Пример координат

// Создание травы
createGrass();

// Создание деревьев
for (let i = 0; i < 60; i++) {
    createTree(Math.random() * 70 - 25, 0, Math.random() * 70 - 25);
}

let moveForward = false;
let moveBackward = false;
let turnLeft = false;
let turnRight = false;
let potion = false;

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = true;
            break;
        case 'KeyS':
            moveBackward = true;
            break;
        case 'KeyA':
            turnLeft = true;
            break;
        case 'KeyD':
            turnRight = true;
            break;
            
        
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = false;
            break;
        case 'KeyS':
            moveBackward = false;
            break;
        case 'KeyA':
            turnLeft = false;
            break;
        case 'KeyD':
            turnRight = false;
            break;
    }
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);


// Ограничения для камеры
const cameraBounds = {
    xMin: -22,
    xMax:  52,
    zMin: -24,
    zMax:  54
};

// Ограничения для ежа
const hedgehogBounds = {
    xMin: -20,
    xMax: 50,
    zMin: -20,
    zMax: 50
};


// Создание bounding box для всех деревьев и ёжика
const treeBoundingBoxes = [];

treGroup.children.forEach(trunk => {
    const trunkBoundingBox = new THREE.Box3().setFromObject(trunk);
    treeBoundingBoxes.push(trunkBoundingBox);
});
const hedgehogBoundingBox = new THREE.Box3().setFromObject(hedgehog);






// Переменные для таймера
let startTime = Date.now();
let time = 0;
let countdownTime = 120;


// Функция для обновления таймера
function updateTimer() {

    
    const grib_picture_button = document.getElementById('grib_picture_button');
        grib_picture_button.onclick = function(event) {
            if (event.shiftKey) {
              alert('You buy 5 mushrooms!');
              if(money>=1){
                updateCount8(money-1);
                updateCount(count+5)
            }
            else{
                alert('Insufficient funds!');
            }
            }
          };
    
    const palka_picture_button = document.getElementById('palka_picture_button');
    palka_picture_button.onclick = function(event) {
            if (event.shiftKey) {
              alert('You buy 5 sticks!');
              if(money>=1){
                updateCount8(money-2);
                updateCount1(count1+5)
            }
            else{
                alert('Insufficient funds!');
            }
            }
          };
      const jabloko_picture_button = document.getElementById('jabloko_picture_button');
      jabloko_picture_button.onclick = function(event) {
            if (event.shiftKey) {
              alert('You buy 5 aplles!');
              if(money>=1){
                updateCount8(money-1);
                updateCount2(count2+5)
            }
            else{
                alert('Insufficient funds!');
            }
            }
          };
    

    let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    let remainingTime = countdownTime - elapsedTime;


    if (remainingTime < 0) remainingTime = 0; // Чтобы таймер не уходил в отрицательные значения

    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    document.getElementById('timer').textContent = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;


    time = minutes*60+seconds

if ( minutes*60+seconds == 120){
    const zero = document.getElementById('0');
if (zero) zero.style.display = 'none';

const one = document.getElementById('1');
if (one) one.style.display = 'none';

const two = document.getElementById('2');
if (two) two.style.display = 'none';

const three = document.getElementById('3');
if (three) three.style.display = 'none';

const four = document.getElementById('4');
if (four) four.style.display = 'block';

}
if (minutes*60+seconds == 90){
    const zero = document.getElementById('0');
if (zero) zero.style.display = 'none';

const one = document.getElementById('1');
if (one) one.style.display = 'none';

const two = document.getElementById('2');
if (two) two.style.display = 'none';

const three = document.getElementById('3');
if (three) three.style.display = 'block';

const four = document.getElementById('4');
if (four) four.style.display = 'none';
    
}
if (minutes*60+seconds == 60){
    const zero = document.getElementById('0');
if (zero) zero.style.display = 'none';

const one = document.getElementById('1');
if (one) one.style.display = 'none';

const two = document.getElementById('2');
if (two) two.style.display = 'block';

const three = document.getElementById('3');
if (three) three.style.display = 'none';

const four = document.getElementById('4');
if (four) four.style.display = 'none';
    
}
if (minutes*60+seconds == 30){
    const zero = document.getElementById('0');
if (zero) zero.style.display = 'none';

const one = document.getElementById('1');
if (one) one.style.display = 'block';

const two = document.getElementById('2');
if (two) two.style.display = 'none';

const three = document.getElementById('3');
if (three) three.style.display = 'none';

const four = document.getElementById('4');
if (four) four.style.display = 'none';
    
}
if (minutes*60+seconds == 0){
    const zero = document.getElementById('0');
if (zero) zero.style.display = 'block';

const one = document.getElementById('1');
if (one) one.style.display = 'none';

const two = document.getElementById('2');
if (two) two.style.display = 'none';

const three = document.getElementById('3');
if (three) three.style.display = 'none';

const four = document.getElementById('4');
if (four) four.style.display = 'none';
    
}






let sklad = parseInt(localStorage.getItem('collisionCount5')) || 0;
let griby = parseInt(localStorage.getItem('collisionCount6')) || 0;
let count = parseInt(localStorage.getItem('collisionCount')) || 0;
let count1 = parseInt(localStorage.getItem('collisionCount1')) || 0;
let count2 = parseInt(localStorage.getItem('collisionCount2')) || 0;


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sklad').textContent = sklad;
    document.getElementById('time_sklad').textContent = sklad;
    document.getElementById('time_griby').textContent = griby;
});

function updateCount5(newsklad) {
    sklad = newsklad;
    localStorage.setItem('collisionCount5', sklad);
    document.getElementById('time_sklad').textContent = sklad;
}

function updateCount(newCount) {
    count = newCount;
    localStorage.setItem('collisionCount', count);
    document.querySelector('.number').textContent = count;
}

function updateCount1(newCount1) {
    count1 = newCount1;
    localStorage.setItem('collisionCount1', count1);
    document.querySelector('.number1').textContent = count1;
} 

function updateCount2(newCount2) {
    count2 = newCount2;
    localStorage.setItem('collisionCount2', count2);
    document.querySelector('.number2').textContent = count2;
}

function updateCount6(griby2) {
    griby = griby2;
    localStorage.setItem('collisionCount6', griby);
    document.getElementById('time_griby').textContent = griby;
}


const skladButton = document.getElementById('skladButton');
if (skladButton) {
    skladButton.addEventListener('click', function(event) {
        event.preventDefault();
        if (count1>=50 && count2>=50){
        sklad += 1;
        count1 -= 50;
        count2 -= 50;
        updateCount5(sklad);
        updateCount1(count1);
        updateCount2(count2);
    }});
   
}
const gribyButton = document.getElementById('gribyButton');
if (gribyButton) {
    gribyButton.addEventListener('click', function(event) {
        event.preventDefault();
        if (count1>=50 && count>=50){
        griby += 1;
        count1 -= 50;
        count -= 50;
        updateCount6(griby);
        updateCount1(count1);
        updateCount(count)
        

    }});
}

    
   

}

function updateCount5(newsklad) {
    sklad = newsklad;
    localStorage.setItem('collisionCount5', sklad);
    document.getElementById('time_sklad').textContent = sklad;
}
function updateCount6(griby2) {
    griby = griby2;
    localStorage.setItem('collisionCount6', griby);
    document.getElementById('time_griby').textContent = griby;
}

function add_time(){
    if (sklad>=1 && timemax<3){
        timemax += 1
       countdownTime += 10; 
       updateCount5(sklad-1);
       console.log(timemax)
    }
    if (sklad<=0){
        countdownTime += 0; 
        updateCount5(sklad-0);
     }
    updateTimer();
    
}
document.addEventListener('keydown', function(event) {
  if (event.code === 'KeyT') {
    add_time()
    


  }
});


let timemax = 0


let isSpeedUp = 0;
let startTime1 = null; 
let countdownTime1 = 10; 


function speed() {
    if (!startTime1) {
        startTime1 = Date.now(); // Запускаем таймер только один раз
    }
    
    let elapsedTime1 = Math.floor((Date.now() - startTime1) / 1000);
    let remainingTime1 = countdownTime1 - elapsedTime1;

    if (remainingTime1 <= 0) {
        isSpeedUp = 0; // Сбрасываем ускорение, если таймер закончился
        startTime1 = null; // Сбрасываем таймер для следующего запуска
        return isSpeedUp;
    } else {
        if (maxspeedrun<3){
        isSpeedUp = 1;}
    }
    return isSpeedUp;


}   

    
let maxspeedrun = 0;


// document.addEventListener('keydown', (e) => console.log(`Нажата клавиша: ${e.key}`));
document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyP') {
        speed()
        if (griby>=1){
        if (maxspeedrun<3){
        updateCount6(griby-1);
        isSpeedUp = 1;
        maxspeedrun += 1 
        console.log(maxspeedrun)
        return isSpeedUp;}
        }
        if (griby<=0){
        updateCount6(griby-0);
        isSpeedUp = 0;
        return isSpeedUp;
    }
    }
  });


  //sgkrrrrrrrrrrrrrrrrrrrrrgr





function Level_Game() {
    
  function updateCount3(newCount3) {
    Level = newCount3;


    if (target <= Level){
        if (target <=99){
            updateCount4(target+10)
            updateCount7(Level2+1)
        }
        if (target <=999){
            updateCount4(target+100)
            updateCount7(Level2+1)
        }
        if (target>=1000){
            updateCount4(target+1000) 
            updateCount7(Level2+1)           
        }
        
    }
    if (target > Level){
        updateCount4(target)
    }
    localStorage.setItem('collisionCount3', Level);
    document.getElementById('points_you').textContent = Level + " / "+ target;
}


    let Coins = (Math.floor(apl/5+gri/5+pal/10));
    let points = (Math.floor((apl+gri+pal)/3));



if (finish == 1 && B == 0){
    finish = 0
    B+=1
    updateCount3((Level+points))  
    updateCount7((Level2))
    updateCount8((money+Coins))
    console.log("Yes")
    
}
else{
    updateCount3((Level))
    updateCount4((target))
}

// console.log("Coins:",Coins,"Aplle:",apl,"Mushrooms:",gri,"Sticks:",pal,"Level:",points);

}


function updateCount4(newCount4) {
    target = newCount4;
    localStorage.setItem('collisionCount4', target);
    // document.getElementById('points_coniec').textContent = target;
}

function updateCount7(newCount7) {
    Level2 = newCount7;
    localStorage.setItem('collisionCount7', Level2);
    document.getElementById('Level').textContent = "Level: " + Level2;
}
function updateCount8(newCount8) {
    money = newCount8;
    localStorage.setItem('collisionCount8', money);
    document.getElementById('money_cyfry').textContent = ": " + money;
}




  //sgkrrrrrrrrrrrrrrrrrrrrrgr



function animate() {
  requestAnimationFrame(animate);
  updateTimer();
  Level_Game();








const button = document.getElementById('shop');
  button.addEventListener('click', function() {
    const priceimg = document.querySelectorAll('.picture');
    priceimg.forEach(element => {
                element.style.display = 'block';
            }); 
    const shopElement = document.getElementById('shop_ground');
    shopElement.style.display = 'block';
    const backElements = document.querySelector('.back1');
    backElements.style.display = 'block';
    const ButtonsElements = document.querySelector('.buttons');
    ButtonsElements.style.display = 'block';
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach(element => {
                element.style.display = 'block';
    
            }); 
});

const button1 = document.querySelector('.back1');
  button1.addEventListener('click', function() {
    const shopElement = document.getElementById('shop_ground');
    shopElement.style.display = 'none';
    const backElements = document.querySelector('.back1');
    backElements.style.display = 'none';
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach(element => {
            element.style.display = 'none';
        }); 
    const priceimg = document.querySelectorAll('.picture');
    priceimg.forEach(element => {
                element.style.display = 'none';
            }); 
});



// console.log(Level, points, time)














let moveSpeed = 0.1;

if (isSpeedUp === 1) {
    speed()
    moveSpeed = 0.2;
} else {
    moveSpeed = 0.1; 
}
    
    
    const turnSpeed = 0.03;

    const currentHedgehogPosition = hedgehog.position.clone();

    if (moveBackward) {
        hedgehog.position.x -= Math.sin(hedgehog.rotation.y) * moveSpeed;
        hedgehog.position.z -= Math.cos(hedgehog.rotation.y) * moveSpeed;
    }
    if (moveForward) {
        hedgehog.position.x += Math.sin(hedgehog.rotation.y) * moveSpeed;
        hedgehog.position.z += Math.cos(hedgehog.rotation.y) * moveSpeed;
    }
    if (turnLeft) {
        hedgehog.rotation.y += turnSpeed;
    }
    if (turnRight) {
        hedgehog.rotation.y -= turnSpeed;
    }

    // Обновляем bounding box ёжика
    hedgehogBoundingBox.setFromObject(hedgehog);

    // Добавляем толерантность к bounding box ёжика
    const tolerance = -0.4; // Измените это значение для настройки толерантности
    const expandedHedgehogBoundingBox = hedgehogBoundingBox.clone().expandByScalar(tolerance);

    let collisionDetected = false;

    // Проверка столкновений со всеми деревьями
    for (let i = 0; i < treeBoundingBoxes.length; i++) {
        if (expandedHedgehogBoundingBox.intersectsBox(treeBoundingBoxes[i])) {
            collisionDetected = true;
            break;
        }
    }

    if (collisionDetected) {
        // Если столкновение произошло, отменяем перемещение ёжика
        hedgehog.position.copy(currentHedgehogPosition);
    }
     // Проверка столкновений со всеми деревьями
     treeGroup.children.forEach(tree => {
        const treeBoundingBox = new THREE.Box3().setFromObject(tree);
        const hedgehogBoundingBox = new THREE.Box3().setFromObject(hedgehog);

        // Проверяем столкновение между ёжиком и деревом
        if (hedgehogBoundingBox.intersectsBox(treeBoundingBox)) {
            // Если столкновение произошло, отменяем перемещение ёжика
            hedgehog.position.copy(currentHedgehogPosition);
        }
    });

    // Камера следует за ежом
    camera.position.x = hedgehog.position.x + 1 * Math.sin(hedgehog.rotation.y + Math.PI);
    camera.position.z = hedgehog.position.z + 1 * Math.cos(hedgehog.rotation.y + Math.PI);
    camera.position.y = hedgehog.position.y + 1.5; // Немного выше ежа
    camera.lookAt(hedgehog.position);

    const degreesToRotate = 40; // Например, поворот на 30 градусов
    const radiansToRotate = THREE.MathUtils.degToRad(degreesToRotate); // Перевод градусов в радианы
    camera.rotateX(radiansToRotate); // Поворачиваем камеру на указанное количество радиан

    // Ограничение позиции камеры
    camera.position.x = Math.max(cameraBounds.xMin, Math.min(cameraBounds.xMax, camera.position.x));
    camera.position.z = Math.max(cameraBounds.zMin, Math.min(cameraBounds.zMax, camera.position.z));
    hedgehog.position.x = Math.max(hedgehogBounds.xMin, Math.min(hedgehogBounds.xMax, hedgehog.position.x));
    hedgehog.position.z = Math.max(hedgehogBounds.zMin, Math.min(hedgehogBounds.zMax, hedgehog.position.z));

    const targetPosition = new THREE.Vector3(12, 0, 2);
    const toleranceForTarget = 0.8;

    function isWithinTolerance(position1, position2, tolerance) {
        return (
            Math.abs(position1.x - position2.x) <= tolerance &&
            Math.abs(position1.y - position2.y) <= tolerance &&
            Math.abs(position1.z - position2.z) <= tolerance
        );
    }


    if (isWithinTolerance(hedgehog.position, targetPosition, toleranceForTarget) || time == 0 ) {
            finish = 1
        const ButtonsElements = document.querySelectorAll('.buttons');
        // Перебираем все найденные элементы и меняем их стиль
        ButtonsElements.forEach(element => {
            element.style.display = 'block';
        });
        // console.log('Hedgehog is within tolerance of target position');
        // console.log('Clearing the entire scene');
        // Получаем элемент с классом 'home'
        const homeElement = document.querySelector('.home');
        homeElement.style.display = 'block';
        const backElement = document.querySelector('.back');
        backElement.style.display = 'block';
        const numberElement = document.querySelector('.number');
        numberElement.style.display = 'block';
        const numberElement1 = document.querySelector('.number1');
        numberElement1.style.display = 'block';
        const numberElement2 = document.querySelector('.number2');
        numberElement2.style.display = 'block';
        const domElements = document.querySelectorAll('.dom');
        // Перебираем все найденные элементы и меняем их стиль
        domElements.forEach(element => {
            element.style.display = 'block';
        });
        const moneyElement = document.getElementById('money');
        moneyElement.style.display = 'block';
        const moneycyfryElement = document.getElementById('money_cyfry');
        moneycyfryElement.style.display = 'block';


// Работа с элементами по их id, но только один элемент, а не коллекция
const zero = document.getElementById('0');
if (zero) zero.style.display = 'none';

const one = document.getElementById('1');
if (one) one.style.display = 'none';

const two = document.getElementById('2');
if (two) two.style.display = 'none';

const three = document.getElementById('3');
if (three) three.style.display = 'none';

const four = document.getElementById('4');
if (four) four.style.display = 'none';

const timer = document.getElementById('timer');
if (timer) timer.style.display = 'none';




        

        // numberElement.textContent = count;
   }
    function updateCount(newCount) {
        count = newCount;
        localStorage.setItem('collisionCount', count);
        document.querySelector('.number').textContent = count;
    }

    function updateCount1(newCount1) {
        count1 = newCount1;
        localStorage.setItem('collisionCount1', count1);
        document.querySelector('.number1').textContent = count1;
    } 

    function updateCount2(newCount2) {
        count2 = newCount2;
        localStorage.setItem('collisionCount2', count2);
        document.querySelector('.number2').textContent = count2;
    }


    // function updateCount3(newCount3) {
    //     Level = newCount3;
    //     localStorage.setItem('collisionCount3', Level);
    //     document.getElementById('points_you').textContent = Level;
    // }
    // function updateCount4(newCount4) {
    //     target = newCount4;
    //     localStorage.setItem('collisionCount4', target);
    //     document.getElementById('points_coniec').textContent = target;
    // }




    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('.number').textContent = count;
        document.querySelector('.number1').textContent = count1;
        document.getElementById('sklad').textContent = sklad;
        document.querySelector('.number2').textContent = count2;
        document.getElementById('points_you').textContent = Level;
        document.getElementById('Level').textContent = Level2;
        // document.getElementById('points_coniec').textContent = target;
        document.getElementById('time_sklad').textContent = sklad;
        document.getElementById('sklad').textContent = sklad;
        document.getElementById('time_sklad').textContent = sklad;
        document.getElementById('time_griby').textContent = griby;
        document.getElementById('money_cyfry').textContent = money;

        

    });


    

    // Проверка на совпадение позиций ежа и грибов
    mushrooms.forEach((mushroom, index) => {
        if (hedgehog.position.distanceTo(mushroom.leg.position) < 1) {
            scene.remove(mushroom.leg);
            scene.remove(mushroom.hat);
            mushrooms.splice(index, 1); // Удаление гриба из массива
            updateCount(count+1)
            gri += 1;
            
            
            // Функция для создания нескольких грибов с уникальными координатами
            function createInitialMushrooms(count) {
                for (let i = 0; i < count; i++) {
                    const newCoords = generateRandomCoordinates();
                    createMushrooms(newCoords.x, newCoords.y, newCoords.z);
                }
            }

            // Создаем от 3 до 5 грибов при запуске
            const initialMushroomCount = Math.floor(Math.random() * 2) + 1; // Генерируем случайное число от 3 до 5
            createInitialMushrooms(initialMushroomCount);
        }
    });

                
    aplles1.forEach((aplle2, index) => {
        if (hedgehog.position.distanceTo(aplle2.position) < 1) {
            apllesGroup.remove(aplle2);
            aplles1.splice(index, 1);
            updateCount2(count2 + 1);
            apl += 1;

            const initialAplleCount = Math.floor(Math.random() * 2) + 1;
            for (let i = 0; i < initialAplleCount; i++) {
                createRandomApple();
                // console.log(x,z);

            }            
        }
    });
// Обновленная проверка коллизий для палок
    palkaGroup.children.forEach((palka, index) => {
        if (hedgehog.position.distanceTo(palka.position) < 1) {
            scene.remove(palka);
            palkaGroup.remove(palka);
            palkaGroup.children.splice(index, 1);
            updateCount1(count1 + 1);
            pal += 1;


            const initialPalkaCount = Math.floor(Math.random() * 2) + 1;
            for (let i = 0; i < initialPalkaCount; i++) {
                createRandomPalka();
            }
        }
    });




    renderer.render(scene, camera);   
}

animate();