<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Tableau de bord</title>
  <link rel="stylesheet" href="home.css">

</head>
<body>

  <div class="sidebar">
    <div class="logo">SupNum</div>
    <ul>
        <li><a href="home .html">Home</a></li>
        <li>Emploi du temps</li>
      <li>groupes</li>
      <li><a href="professeurs.php">Professeurs</a></li>
      <li>Filières</li>
      <li>Salles</li>
      <li><a href="matiers.php">matiere</a></li>
    </ul>
  </div>
<?php
$username="root";
$servername="localhost";
$password="";
$bd="Pi";
$con=mysqli_connect($servername,$username,$password,$bd);
if(!$con)
die("il ya une erreur".mysqli_connect_error());

?>
<doctype html>
<html>

<head>
<style>
fieldset{
    width:200px;
    margin-left:300px;
    margin-top:100px;
}
button{
width:100px;
background-color:#9484b2;
}

</style>

<title></title>
</head>
<body>
    <div class="form-container">
  <img src="homework.png" class="user">
  <form method="post" name="formulaire">
    <div class="form-group">
      <label for="nom">Nom</label>
      <input type="text" id="nom" name="nom">
    </div>
    <div class="form-group">
      <label for="code">code de la matiere</label>
      <input type="code" id="code" name="code">
    </div>
    
    <button type="submit" name="valider" class="save">Save</button>

</form>
</div>
<?php 

if (isset($_POST["valider"])){
$nom=$_POST["nom"];
$code=$_POST["code"];

$sql="insert into matiere(code_matiere,nom)
values('$code','$nom')"; 
header("location:matiers.php");
$result=mysqli_query($con,$sql);
if($result){
echo "<h1 style='color:green'>l'insertion est  reuissie </h1>";
}

else{
die("il ya une probleme".mysqli_error($con));
}

}

?>
</body>
</html>




</body>
</html>
  
</body>
</html>