
class ObjetoOBJ extends THREE.Mesh {
  constructor() {
    super();

    // Se crea la parte de la interfaz que corresponde a la taza
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI();



    // TUTORIAL https://www.youtube.com/watch?v=wHuSQ7I1aKs
    // Se carga la textura
    var objLoader;


	   this.material = mtlLoader;

    // Un Mesh se compone de geometría y material
    this.geometry = new THREE.Geometry().fromBufferGeometry( objLoader.geometry );
    // Las primitivas básicas se crean centradas en el origen
    // Se puede modificar su posición con respecto al sistema de coordenadas local con una transformación aplicada directamente a la geometría.
    // Como material se crea uno a partir de un color

  }

  createGUI () {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;

      this.rotX = 0.0;
      this.rotY = 0.0;
      this.rotZ = 0.0;

      this.posX = 0.0;
      this.posY = 0.0;
      this.posZ = 0.0;

      this.animate = false;

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;

        this.rotX = 0.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;

        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ('Controles del ObjetoBarrido');
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();

    folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name ('Rotación X : ').listen();
    folder.add (this.guiControls, 'rotY', 0.0, Math.PI/2, 0.1).name ('Rotación Y : ').listen();
    folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();

    folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
    folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
    folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();

    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    folder.add (this.guiControls, 'animate', 0,1).name('[ Animate ]').listen();
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación


    // Si se le ha dado a animar, rota de manera loca, si no aplica los movimientos.
    if(this.guiControls.animate){
      this.guiControls.rotX= this.guiControls.rotX+0.01;
      this.guiControls.rotY = this.guiControls.rotY+0.01;
      this.guiControls.rotZ = this.guiControls.rotZ+0.01;
      this.rotation.set(this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    }
    else{
      this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
      this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
      this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    }
  }
}
