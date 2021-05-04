<?php
$curlRessources = curl_init("https://api.openweathermap.org/data/2.5/weather?q=Dakar&appid=f6187145665d65c9611514f6d608fed7");
curl_setopt_array($curlRessources, [
    CURLOPT_CAINFO =>  __DIR__ . DIRECTORY_SEPARATOR . 'cert.cer',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 1
]);
// curl_setopt($curlRessources, CURLOPT_CAINFO, __DIR__ . DIRECTORY_SEPARATOR . 'cert.cer');
// curl_setopt($curlRessources, CURLOPT_RETURNTRANSFER, true); // Permet de recuper le resultat
$data = curl_exec($curlRessources);
var_dump($data);
$object = json_decode($data, true);
echo "<br><br><br><br>";

// if(is_array($object)) echo PHP_EOL. "vrai" . PHP_EOL;

if($data === false){
    var_dump(curl_error($curlRessources));
}else{
    if(curl_getinfo($curlRessources, CURLINFO_HTTP_CODE) === 200){
        echo "<pre>";
        var_dump($object["coord"]["lon"]);
        echo "</pre>";
    }
}
curl_close($curlRessources);

/**
 * test
 *
 * @param  string $a
 * @param  array $b
 * @return int
 */
function test(string $a, array $b): int{
    return 20;
}