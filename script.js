body {
    font-family: Arial, sans-serif;
    background-color: #e0f7fa;
    text-align: center;
}

.container {
    max-width: 600px;
    margin: auto;
}

#ships {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

.ship {
    width: 40px;
    height: 40px;
    margin: 5px;
    background-color: #00796b;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
}

#board {
    display: grid;
    grid-template-columns: repeat(10, 40px);
    grid-template-rows: repeat(10, 40px);
    margin: 20px auto;
}

.cell {
    width: 40px;
    height: 40px;
    border: 1px solid #000;
    cursor: pointer;
}

.hit {
    background-color: red;
}

.miss {
    background-color: lightgray;
}

.explosion {
    background-image: url('explosion.gif'); /* Certifique-se de ter uma animação de explosão */
    background-size: cover;
}
