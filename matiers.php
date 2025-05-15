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
$bd="pi";
$con=mysqli_connect($servername,$username,$password,$bd);
if(!$con)
die("il ya une erreur".mysqli_connect_error());


$sql="select * from matiere";

$result=mysqli_query($con,$sql);
?>
<doctype html>
<html>
<head>
<style>
</style>
<title></title>
</head>
<body>
<input type="recherche"  class="recherche"placeholder="Recherche...">
      <div class="prof">
        <div style="display: flex; align-items: center; margin-left:15px;">
            <h2 style="margin: 0;">Matières</h2>
            <img src="homework.png"  style="margin-left:5px;"class="user"></div>
<a href="ajou matiers.php">
          <img style="margin-right:25px;"class="ajouter"src="plus.png"></a></p>
   <table>

<tr> <th>ID</th>

<th>Nom</th>
<th>code</th>

<th colspan="2">Action</th>

</tr>
<?php while($user=mysqli_fetch_array($result))
{ 
?>
<tr> 
<td align="center" style="background-color:rgb(235, 233, 233)"><?php echo $user["id"] ;?></td>
<td align="center"><?php echo $user["nom"];?></td>

<td align="center" style="background-color:rgb(235, 233, 233)"><?php echo $user["code_matiere"];?></td>

<td align="center" style="background-color:rgb(235, 233, 233)"><img class="icone"src="bin.png"></td>

<td align="center"><img class="icone"src="edit.png"></td>

</tr>
<?php } ;
?>

</table>
</div>
</body>
</html>
  
</body>
</html>