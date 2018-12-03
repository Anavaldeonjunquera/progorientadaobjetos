<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
//conversion a json
function creativeworktojson()
{
    global $creativeworks;
    $jsonfinal='[';
    for ($i = 0; $i < sizeof($creativeworks); $i++) {
        $jsonfinal=$jsonfinal.'{' .'"@context":"http://schema.org","@type":"CreativeWork",'. ' "id":' . $creativeworks[$i]->getId() . ', "name":"' . $creativeworks[$i]->getName() . '","isFamilyFriendly":' . $creativeworks[$i]->getIsFamilyFriendly() . ', "isAccessibleForFree":' . $creativeworks[$i]->getisAccessibleForFree() . ', "copyrightYear":' . $creativeworks[$i]->getCopyrightYear() . ', "version":' . $creativeworks[$i]->getVersion() . ' }';
        if($i<(sizeof($creativeworks)-1)){
            $jsonfinal=$jsonfinal.',';
        }
    }
    $jsonfinal=$jsonfinal.']';
    return $jsonfinal;
}

function booktojson()
{
    global $books;
    $jsonfinal='[';
    for ($i = 0; $i < sizeof($books); $i++) {
        $jsonfinal=$jsonfinal.'{' . '"@context":"http://schema.org","@type":"Book",'.' "id":' .$books[$i]->getId(). ', "name":"' . $books[$i]->getName() . '","isFamilyFriendly":' . $books[$i]->getIsFamilyFriendly() . ', "isAccessibleForFree":' . $books[$i]->getisAccessibleForFree() . ', "copyrightYear":' . $books[$i]->getCopyrightYear() . ', "version":' . $books[$i]->getVersion() . ', "bookEdition":"' . $books[$i]->getBookEdition() . '", "isbn":"' . $books[$i]->getIsbn(). '", "numberOfPages":' . $books[$i]->getNumberOfPages() . ', "abridged":' . $books[$i]->getAbridged() . ' }';
        if($i<(sizeof($books)-1)){
            $jsonfinal=$jsonfinal.',';
        }
    }
    $jsonfinal=$jsonfinal.']';
    return $jsonfinal;
}

function articletojson()
{
    global $articles;
    $jsonfinal='[';
    for ($i = 0; $i < sizeof($articles); $i++) {
        $jsonfinal=$jsonfinal.'{' .'"@context":"http://schema.org","@type":"Article",'. ' "id":' . $articles[$i]->getId() . ', "name":"' . $articles[$i]->getName() . '","isFamilyFriendly":' . $articles[$i]->getIsFamilyFriendly() . ', "isAccessibleForFree":' . $articles[$i]->getisAccessibleForFree() . ', "copyrightYear":' . $articles[$i]->getCopyrightYear() . ', "version":' . $articles[$i]->getVersion() . ', "articleSection":"' . $articles[$i]->getArticleSection() . '", "pagination":"' . $articles[$i]->getPagination(). '", "wordCount":' . $articles[$i]->getWordCount() . ' }';
        if($i<(sizeof($articles)-1)){
            $jsonfinal=$jsonfinal.',';
        }
    }
    $jsonfinal=$jsonfinal.']';
    return $jsonfinal;
}

//conversion a xml
function creativeworktoxml(){
    global $creativeworks;
    $mixml="<creativeworks>";
    for($i = 0; $i < sizeof($creativeworks); $i++) {
       $mixml=$mixml.'<creativework id='.$creativeworks[$i]->getId().'>';
       $mixml=$mixml.'<name>'.$creativeworks[$i]->getName().'</name>';
       $mixml=$mixml.'<isFamilyFriendly>'.$creativeworks[$i]->getIsFamilyFriendly().'</isFamilyFriendly>';
       $mixml=$mixml.'<isAccessibleForFree>'.$creativeworks[$i]->getisAccessibleForFree().'</isAccessibleForFree>';
       $mixml=$mixml.'<copyrightYear>'.$creativeworks[$i]->getCopyrightYear().'</copyrightYear>';
       $mixml=$mixml.'<version>'.$creativeworks[$i]->getVersion().'</version>';
       $mixml=$mixml.'</creativework>';
    }
    $mixml=$mixml.'</creativeworks>';
    return $mixml;
}

function booktoxml(){
    global $books;
    $mixml="<books>";
    for($i = 0; $i < sizeof($books); $i++) {
        $mixml=$mixml.'<book id='.$books[$i]->getId().'>';
        $mixml=$mixml.'<name>'.$books[$i]->getName().'</name>';
        $mixml=$mixml.'<isFamilyFriendly>'.$books[$i]->getIsFamilyFriendly().'</isFamilyFriendly>';
        $mixml=$mixml.'<isAccessibleForFree>'.$books[$i]->getisAccessibleForFree().'</isAccessibleForFree>';
        $mixml=$mixml.'<copyrightYear>'.$books[$i]->getCopyrightYear().'</copyrightYear>';
        $mixml=$mixml.'<version>'.$books[$i]->getVersion().'</version>';
        $mixml=$mixml.'<bookEdition>'.$books[$i]->getBookEdition().'</bookEdition>';
        $mixml=$mixml.'<isbn>'.$books[$i]->getIsbn().'</isbn>';
        $mixml=$mixml.'<numberOfPages>'.$books[$i]->getNumberOfPages().'</numberOfPages>';
        $mixml=$mixml.'<abridged>'.$books[$i]->getAbridged().'</abridged>';
        $mixml=$mixml.'</book>';
    }
    $mixml=$mixml.'</books>';
    return $mixml;
}
function articletoxml(){
    global $articles;
    $mixml="<articles>";
    for($i = 0; $i < sizeof($articles); $i++) {
        $mixml=$mixml.'<article id='.$articles[$i]->getId().'>';
        $mixml=$mixml.'<name>'.$articles[$i]->getName().'</name>';
        $mixml=$mixml.'<isFamilyFriendly>'.$articles[$i]->getIsFamilyFriendly().'</isFamilyFriendly>';
        $mixml=$mixml.'<isAccessibleForFree>'.$articles[$i]->getisAccessibleForFree().'</isAccessibleForFree>';
        $mixml=$mixml.'<copyrightYear>'.$articles[$i]->getCopyrightYear().'</copyrightYear>';
        $mixml=$mixml.'<version>'.$articles[$i]->getVersion().'</version>';
        $mixml=$mixml.'<articleSection>'.$articles[$i]->getArticleSection().'</articleSection>';
        $mixml=$mixml.'<pagination>'.$articles[$i]->getPagination().'</pagination>';
        $mixml=$mixml.'<wordCount>'.$articles[$i]->getWordCount().'</wordCount>';
        $mixml=$mixml.'</article>';
    }
    $mixml=$mixml.'</articles>';
    return $mixml;
}


//conversion a html
function creativeworktohtml(){
    global $creativeworks;
    $respuestahtml="<ul>";
    for($i = 0; $i < sizeof($creativeworks); $i++) {
        $respuestahtml = $respuestahtml . "<li>" . $creativeworks[$i]->getId()." ".$creativeworks[$i]->getName()." ".$creativeworks[$i]->getIsFamilyFriendly()." ".$creativeworks[$i]->getisAccessibleForFree()." ".$creativeworks[$i]->getCopyrightYear()." ".$creativeworks[$i]->getVersion() . "</li>";
    }
    $respuestahtml=$respuestahtml."</ul>";
    return $respuestahtml;
}

function booktohtml(){
    global $books;
    $respuestahtml="<ul>";
    for($i = 0; $i < sizeof($books); $i++) {
        $respuestahtml = $respuestahtml . "<li>" . $books[$i]->getId()." ".$books[$i]->getName()." ".$books[$i]->getIsFamilyFriendly()." ".$books[$i]->getisAccessibleForFree()." ".$books[$i]->getCopyrightYear()." ".$books[$i]->getVersion()." ".$books[$i]->getBookEdition()." ".$books[$i]->getIsbn()." ".$books[$i]->getNumberOfPages()." ".$books[$i]->getAbridged() . "</li>";
    }
    $respuestahtml=$respuestahtml."</ul>";
    return $respuestahtml;
}
function articletohtml(){
    global $articles;
    $respuestahtml="<ul>";
    for($i = 0; $i < sizeof($articles); $i++) {
        $respuestahtml = $respuestahtml . "<li>" .$articles[$i]->getId()." ".$articles[$i]->getName()." ".$articles[$i]->getIsFamilyFriendly()." ".$articles[$i]->getisAccessibleForFree()." ".$articles[$i]->getCopyrightYear()." ".$articles[$i]->getVersion()." ".$articles[$i]->getArticleSection()." ".$articles[$i]->getPagination()." ".$articles[$i]->getWordCount() . "</li>";
    }
    $respuestahtml=$respuestahtml."</ul>";
    return $respuestahtml;
}
//conversion a texto plano
function creativeworktotext(){
    global $creativeworks;
    $respuesta="";
    for($i = 0; $i < sizeof($creativeworks); $i++) {
        $respuesta = $respuesta . $creativeworks[$i]->getId()." ".$creativeworks[$i]->getName()." ".$creativeworks[$i]->getIsFamilyFriendly()." ".$creativeworks[$i]->getisAccessibleForFree()." ".$creativeworks[$i]->getCopyrightYear()." ".$creativeworks[$i]->getVersion()."\n";
    }
    return $respuesta;
}

function booktotext(){
    global $books;
    $respuesta="";
    for($i = 0; $i < sizeof($books); $i++) {
        $respuesta= $respuesta. $books[$i]->getId()." ".$books[$i]->getName()." ".$books[$i]->getIsFamilyFriendly()." ".$books[$i]->getisAccessibleForFree()." ".$books[$i]->getCopyrightYear()." ".$books[$i]->getVersion()." ".$books[$i]->getBookEdition()." ".$books[$i]->getIsbn()." ".$books[$i]->getNumberOfPages()." ".$books[$i]->getAbridged()."\n";
    }

    return $respuesta;
}
function articletotext(){
    global $articles;
    $respuesta="";
    for($i = 0; $i < sizeof($articles); $i++) {
        $respuesta = $respuesta .  $articles[$i]->getId()." ".$articles[$i]->getName()." ".$articles[$i]->getIsFamilyFriendly()." ".$articles[$i]->getisAccessibleForFree()." ".$articles[$i]->getCopyrightYear()." ".$articles[$i]->getVersion()." ".$articles[$i]->getArticleSection()." ".$articles[$i]->getPagination()." ".$articles[$i]->getWordCount() ."\n";
    }

    return $respuesta;
}
//clases con sus get porque los atributos son private
class CreativeWork{
    private $id;
    private $name;
    private $isFamilyFriendly;
    private $isAccessibleForFree;
    private $copyrightYear;
    private $version;
    function __construct($id,$name,$isFamilyFriendly,$isAccessibleForFree,$copyrightYear,$version){
        $this->id=$id;
        $this->name=$name;
        $this->isAccessibleForFree=$isAccessibleForFree;
        $this->isFamilyFriendly=$isFamilyFriendly;
        $this->copyrightYear=$copyrightYear;
        $this->version=$version;
    }
    function getId(){
        return $this->id;
    }
    function getName(){
        return $this->name;
    }
    function getIsFamilyFriendly(){
        if($this->isFamilyFriendly)
            return "true";
        return "false";
    }
    function getIsFamilyFriendlyguardar(){
        return $this->isFamilyFriendly;
    }
    function getisAccessibleForFreeguardar(){
        return $this->isAccessibleForFree;
    }
    function getisAccessibleForFree(){
        if ($this->isAccessibleForFree)
            return "true";
        return "false";
    }
    function getCopyrightYear(){
        return $this->copyrightYear;
    }
    function getVersion(){
        return $this->version;
    }
}
class Book extends CreativeWork{
    private $bookEdition;
    private $isbn;
    private $numberOfPages;
    private $abridged;
    function __construct($id,$name,$isFamilyFriendly,$isAccessibleForFree,$copyrightYear,$version,$bookEdition,$isbn,$numberOfPages,$abridged){
        parent::__construct($id,$name,$isFamilyFriendly,$isAccessibleForFree,$copyrightYear,$version);
        $this->bookEdition=$bookEdition;
        $this->isbn=$isbn;
        $this->numberOfPages=$numberOfPages;
        $this->abridged=$abridged;
    }
    function getBookEdition(){
        return $this->bookEdition;
    }
    public function getAbridged()
    {
        if ($this->abridged)
            return "true";
        return "false";
    }
    public function getAbridgedguardar()
    {
        return $this->abridged;
    }
    public function getNumberOfPages()
    {
        return $this->numberOfPages;
    }
    public function getIsbn()
    {
        return $this->isbn;
    }
}
class Article extends CreativeWork{
    private $articleSection;
    private $pagination;
    private $wordCount;
    function __construct($id,$name,$isFamilyFriendly,$isAccessibleForFree,$copyrightYear,$version,$articleSection,$pagination,$wordCount){
        parent::__construct($id,$name,$isFamilyFriendly,$isAccessibleForFree,$copyrightYear,$version);
        $this->articleSection=$articleSection;
        $this->pagination=$pagination;
        $this->wordCount=$wordCount;
    }


    public function getArticleSection()
    {
        return $this->articleSection;
    }


    public function getPagination()
    {
        return $this->pagination;
    }


    public function getWordCount()
    {
        return $this->wordCount;
    }
}


//arrays con los elementos de las entidades
global $creativeworks;
$creativeworks= Array();
global $books;
$books=Array();
global $articles;
$articles=Array();
$idarticle=0;
$idcreativework=0;
$idbook=0;
//se introducen unos elementos de prueba






$jsoncreativeworkdatas = file_get_contents("data.json");
if ($jsoncreativeworkdatas!=null){
    $arr_creativework_data = json_decode('['.$jsoncreativeworkdatas.']', true);
    foreach ($arr_creativework_data as &$valor){
        $creativeworks[]=new CreativeWork($valor['id'],$valor['name'],$valor['isFamilyFriendly'],$valor['isAccessibleForFree'],$valor['copyrightYear'],$valor['version']);
    }
    if (sizeof($creativeworks)!=0){
        $idcreativework=$creativeworks[sizeof($creativeworks)-1]->getId();
    }else{
        $idcreativework=-1;
    }
}else{
    $idcreativework=-1;
}
$jsonbookdatas = file_get_contents("data2.json");
if ($jsonbookdatas!=null){
    $arr_book_data = json_decode('['.$jsonbookdatas.']', true);
    foreach ($arr_book_data as &$valor){
        $books[]=new Book($valor['id'],$valor['name'],$valor['isFamilyFriendly'],$valor['isAccessibleForFree'],$valor['copyrightYear'],$valor['version'],$valor['bookEdition'],$valor['isbn'],$valor['numberOfPages'],$valor['abridged']);
    }
    if (sizeof($books)!=0){
        $idbook=$books[sizeof($books)-1]->getId();
    }else{
        $idbook=-1;
    }
}else{
    $idbook=-1;
}
$jsonarticledatas = file_get_contents("data3.json");
if ($jsonarticledatas!=null){
    $arr_article_data = json_decode('['.$jsonarticledatas.']', true);
    foreach ($arr_article_data as &$valor){
        $articles[]=new Article($valor['id'],$valor['name'],$valor['isFamilyFriendly'],$valor['isAccessibleForFree'],$valor['copyrightYear'],$valor['version'],$valor['articleSection'],$valor['pagination'],$valor['wordCount']);
    }
    if (sizeof($creativeworks)!=0){
        $idarticle=$articles[sizeof($articles)-1]->getId();
    }else{
        $idarticle=-1;
    }
}else{
    $idarticle=-1;
}

$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    http_response_code(200);
}

//se saca el path y el id en caso de haberlo
if (isset($_SERVER['PATH_INFO'])) {
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'))[0];
    if(count(explode('/', trim($_SERVER['PATH_INFO'],'/')))==2){
        $id=explode('/', trim($_SERVER['PATH_INFO'],'/'))[1];
    }else
        $id=null;
} else {
    $request = null;
}

//formato en el que se desea la respuesta
$formato = $_SERVER['HTTP_ACCEPT'] or 'html';
try {

    //en función del path solicitado se retorna lo correspondiente con el formato deseado
    if (!$request) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                echo "[{\"nombre\":\"creativeWork\"},{\"nombre\":\"book\"},{\"nombre\":\"article\"}]";
                break;
            default:
                http_response_code(404);
                echo "not allowed";
                break;
        }
    } elseif (strcmp('creativework', $request) === 0 && $id == null) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                switch ($formato) {
                    case 'application/xml':
                        header('Content-type: application/xml');
                        echo creativeworktoxml();
                        break;
                    case 'application/ld+json':
                        header('Content-type: application/ld+json');
                        echo json_encode(creativeworktojson());
                        break;
                    case 'text/plain':
                        header('Content-type:text/plain');
                        echo creativeworktotext();
                        break;
                    default:
                        header('Content-type: text/html');
                        echo creativeworktohtml();
                        break;
                }
                break;
            case "PUT":
                http_response_code(404);
                echo "PUT not allowed over every Creative Work";
                break;
            case "POST":
                $creative_work = json_decode(file_get_contents('php://input'));

                if (is_null($creative_work->name)) {
                    http_response_code(405);
                    echo "name no puede ser nulo";
                } elseif (is_null($creative_work->copyrightYear)) {
                    http_response_code(405);
                    echo "copyrightYear no puede ser nulo";
                } elseif (is_null($creative_work->version)) {
                    http_response_code(405);
                    echo "version no puede ser nulo";
                }elseif(!is_string($creative_work->name)){
                    http_response_code(405);
                    echo "name debe ser string";
                }elseif(!is_int($creative_work->version)){
                    http_response_code(405);
                    echo "version debe ser numerico";
                }elseif(!is_int($creative_work->copyrightYear)){
                    http_response_code(405);
                    echo "copyrightYear debe ser numerico";
                } else {
                    http_response_code(200);
                    $idcreativework++;
                    $nueva = new CreativeWork($idcreativework, $creative_work->name, $creative_work->isFamilyFriendly, $creative_work->isAccessibleForFree, $creative_work->copyrightYear, $creative_work->version);
                    global $creativeworks;
                    $creativeworks[] = $nueva;

                    $variableguardar = array('id' => $nueva->getId(), 'name' => $nueva->getName(), 'isFamilyFriendly' => $nueva->getIsFamilyFriendlyguardar(), 'isAccessibleForFree' => $nueva->getisAccessibleForFreeguardar(), 'copyrightYear' => $nueva->getCopyrightYear(), 'version' => $nueva->getVersion());
                    $jsoncreativeworkdatas = file_get_contents("data.json");
                    if ($jsoncreativeworkdatas != null) {
                        file_put_contents("data.json", "," . json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                    } else {
                        file_put_contents("data.json", json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                    }
                }

                break;
            case "DELETE":
                http_response_code(404);
                echo "DELETE not allowed over every Creative Work";
                break;
            case "OPTIONS":
                http_response_code(200);
                break;
            default:
                http_response_code(404);
                echo "not allowed";
                break;
        }
    } elseif (strcmp('creativework', $request) === 0 && $id != null) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $actualizado = false;
                for ($i = 0; $i < sizeof($creativeworks); $i++) {
                    if ($creativeworks[$i]->getId() == $id) {
                        echo '{' . '"@context":"http://schema.org","@type":"CreativeWork",' . ' "id":' . $id . ', "name":"' . $creativeworks[$i]->getName() . '","isFamilyFriendly":' . $creativeworks[$i]->getIsFamilyFriendly() . ', "isAccessibleForFree":' . $creativeworks[$i]->getisAccessibleForFree() . ', "copyrightYear":' . $creativeworks[$i]->getCopyrightYear() . ', "version":' . $creativeworks[$i]->getVersion() . ' }';
                        $actualizado = true;
                    }
                }
                if (!$actualizado) {
                    http_response_code(404);
                    echo "not allowed";
                }
                break;
            case "PUT":
                $actualizado = false;
                $creative_work = json_decode(file_get_contents('php://input'));

                if (is_null($creative_work->name)) {
                    http_response_code(405);
                    echo "name no puede ser nulo";
                } elseif (is_null($creative_work->copyrightYear)) {
                    http_response_code(405);
                    echo "copyrightYear no puede ser nulo";
                } elseif (is_null($creative_work->version)) {
                    http_response_code(405);
                    echo "version no puede ser nulo";
                }elseif(!is_string($creative_work->name)){
                    http_response_code(405);
                    echo "name debe ser string";
                }elseif(!is_int($creative_work->version)){
                    http_response_code(405);
                    echo "version debe ser numerico";
                }elseif(!is_int($creative_work->copyrightYear)){
                    http_response_code(405);
                    echo "copyrightYear debe ser numerico";
                } else {
                    for ($i = 0; $i < sizeof($creativeworks); $i++) {
                        if ($creativeworks[$i]->getId() == $id) {
                            http_response_code(200);
                            $actualizado = true;
                            global $creativeworks;
                            $creativeworks[$i] = new CreativeWork($creativeworks[$i]->getId(), $creative_work->name, $creative_work->isFamilyFriendly, $creative_work->isAccessibleForFree, $creative_work->copyrightYear, $creative_work->version);

                            file_put_contents("data.json", "");
                            for ($i = 0; $i < sizeof($creativeworks); $i++) {
                                $variableguardar = array('id' => $creativeworks[$i]->getId(), 'name' => $creativeworks[$i]->getName(), 'isFamilyFriendly' => $creativeworks[$i]->getIsFamilyFriendlyguardar(), 'isAccessibleForFree' => $creativeworks[$i]->getisAccessibleForFreeguardar(), 'copyrightYear' => $creativeworks[$i]->getCopyrightYear(), 'version' => $creativeworks[$i]->getVersion());
                                $jsonguardacreativework = file_get_contents("data.json");
                                if ($jsonguardacreativework != null) {
                                    file_put_contents("data.json", "," . json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                                } else {
                                    file_put_contents("data.json", json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                                }
                            }
                        }
                    }
                    if (!$actualizado) {
                        http_response_code(404);
                        echo "not allowed";
                    }
                }

                break;
            case "POST":
                http_response_code(404);
                echo "POST not allowed over a particular Creative Work";
                break;
            case "DELETE":

                $actualizado = false;
                for ($i = 0; $i < sizeof($creativeworks); $i++) {
                    if ($creativeworks[$i]->getId() == $id) {
                        http_response_code(200);
                        $actualizado = true;
                        file_put_contents("data.json", "");
                        for ($i = 0; $i < sizeof($creativeworks); $i++) {
                            if ($creativeworks[$i]->getId() != $id) {
                                $variableguardar = array('id' => $creativeworks[$i]->getId(), 'name' => $creativeworks[$i]->getName(), 'isAccessibleForFree' => $creativeworks[$i]->getisAccessibleForFreeguardar(), 'isFamilyFriendly' => $creativeworks[$i]->getIsFamilyFriendlyguardar(), 'copyrightYear' => $creativeworks[$i]->getCopyrightYear(), 'version' => $creativeworks[$i]->getVersion());
                                $jsonguardacreativework = file_get_contents("data.json");
                                if ($jsonguardacreativework != null) {
                                    file_put_contents("data.json", "," . json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                                } else {
                                    file_put_contents("data.json", json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                                }
                            }
                        }
                    }
                }
                if (!$actualizado) {
                    http_response_code(404);
                    echo "not allowed";
                }
                break;
            case "OPTIONS":
                http_response_code(200);
                break;
            default:
                http_response_code(404);
                echo "not allowed";
                break;
        }
    } elseif (strcmp('book', $request) === 0 && $id == null) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                switch ($formato) {
                    case 'application/xml':
                        header('Content-type: application/xml');
                        echo booktoxml();
                        break;
                    case 'application/ld+json':
                        header('Content-type: application/json');
                        echo json_encode(booktojson());
                        break;
                    case 'text/plain':
                        header('Content-type:text/plain');
                        echo booktotext();
                        break;
                    default:
                        header('Content-type: text/html');
                        echo booktohtml();
                        break;
                }

                break;
            case "PUT":
                http_response_code(404);
                echo "PUT not allowed over every Book";
                break;
            case "POST":
                $book_insertar = json_decode(file_get_contents('php://input'));

                if (is_null($book_insertar->name)) {
                    http_response_code(405);
                    echo "name no puede ser nulo";
                } elseif (is_null($book_insertar->copyrightYear )) {
                    http_response_code(405);
                    echo "copyrightYear no puede ser nulo";
                } elseif (is_null($book_insertar->version)) {
                    http_response_code(405);
                    echo "version no puede ser nulo";
                } elseif (is_null($book_insertar->bookEdition)) {
                    http_response_code(405);
                    echo "bookEdition no puede ser nulo";
                } elseif (is_null($book_insertar->isbn)) {
                    http_response_code(405);
                    echo "isbn no puede ser nulo";
                } elseif (is_null($book_insertar->numberOfPages)) {
                    http_response_code(405);
                    echo "numberOfPages no puede ser nulo";
                } elseif(!is_string($book_insertar->name)){
                    http_response_code(405);
                    echo "name debe ser string";
                }elseif(!is_int($book_insertar->version)){
                    http_response_code(405);
                    echo "version debe ser numerico";
                }elseif(!is_int($book_insertar->copyrightYear)){
                    http_response_code(405);
                    echo "copyrightYear debe ser numerico";
                }elseif(!is_string($book_insertar->bookEdition)){
                        http_response_code(405);
                        echo "bookEdition debe ser string";
                }elseif(!is_string($book_insertar->isbn)){
                    http_response_code(405);
                    echo "isbn debe ser string";
                }elseif(!is_int($book_insertar->numberOfPages)){
                    http_response_code(405);
                    echo "numberOfPages debe ser numerico";
                } else {
                    $idbook++;
                    $nueva = new Book($idbook, $book_insertar->name, $book_insertar->isFamilyFriendly, $book_insertar->isAccessibleForFree, $book_insertar->copyrightYear, $book_insertar->version, $book_insertar->bookEdition, $book_insertar->isbn, $book_insertar->numberOfPages, $book_insertar->abridged);
                    global $books;
                    $books[] = $nueva;
                    $variableguardar = array('id' => $nueva->getId(), 'name' => $nueva->getName(), 'isFamilyFriendly' => $nueva->getIsFamilyFriendlyguardar(), 'isAccessibleForFree' => $nueva->getisAccessibleForFreeguardar(), 'copyrightYear' => $nueva->getCopyrightYear(), 'version' => $nueva->getVersion(), 'bookEdition' => $nueva->getBookEdition(), 'isbn' => $nueva->getIsbn(), 'numberOfPages' => $nueva->getNumberOfPages(), 'abridged' => $nueva->getAbridgedguardar());
                    $jsonbookdatas = file_get_contents("data2.json");
                    if ($jsonbookdatas != null) {
                        file_put_contents("data2.json", "," . json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                    } else {
                        file_put_contents("data2.json", json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                    }
                }

                break;
            case "DELETE":
                http_response_code(404);
                echo "DELETE not allowed over every Book";
                break;
            case "OPTIONS":
                http_response_code(200);
                break;
            default:
                http_response_code(404);
                echo "not allowed";
                break;
        }
    } elseif (strcmp('book', $request) === 0 && $id != null) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $actualizado = false;
                for ($i = 0; $i < sizeof($books); $i++) {
                    if ($books[$i]->getId() == $id) {
                        echo '{' . '"@context":"http://schema.org","@type":"Book",' . ' "id":' . $id . ', "name":"' . $books[$i]->getName() . '","isFamilyFriendly":' . $books[$i]->getIsFamilyFriendly() . ', "isAccessibleForFree":' . $books[$i]->getisAccessibleForFree() . ', "copyrightYear":' . $books[$i]->getCopyrightYear() . ', "version":' . $books[$i]->getVersion() . ', "bookEdition":"' . $books[$i]->getBookEdition() . '", "isbn":"' . $books[$i]->getIsbn() . '", "numberOfPages":' . $books[$i]->getNumberOfPages() . ', "abridged":' . $books[$i]->getAbridged() . ' }';
                        $actualizado = true;
                    }
                }
                if (!$actualizado) {
                    http_response_code(404);
                    echo "not allowed";
                }
                break;
            case "PUT":
                $actualizado = false;
                $book_insertar = json_decode(file_get_contents('php://input'));

                if (is_null($book_insertar->name)) {
                    http_response_code(405);
                    echo "name no puede ser nulo";
                } elseif (is_null($book_insertar->copyrightYear )) {
                    http_response_code(405);
                    echo "copyrightYear no puede ser nulo";
                } elseif (is_null($book_insertar->version)) {
                    http_response_code(405);
                    echo "version no puede ser nulo";
                } elseif (is_null($book_insertar->bookEdition)) {
                    http_response_code(405);
                    echo "bookEdition no puede ser nulo";
                } elseif (is_null($book_insertar->isbn)) {
                    http_response_code(405);
                    echo "isbn no puede ser nulo";
                } elseif (is_null($book_insertar->numberOfPages)) {
                    http_response_code(405);
                    echo "numberOfPages no puede ser nulo";
                } elseif(!is_string($book_insertar->name)){
                    http_response_code(405);
                    echo "name debe ser string";
                }elseif(!is_int($book_insertar->version)){
                    http_response_code(405);
                    echo "version debe ser numerico";
                }elseif(!is_int($book_insertar->copyrightYear)){
                    http_response_code(405);
                    echo "copyrightYear debe ser numerico";
                }elseif(!is_string($book_insertar->bookEdition)){
                    http_response_code(405);
                    echo "bookEdition debe ser string";
                }elseif(!is_string($book_insertar->isbn)){
                    http_response_code(405);
                    echo "isbn debe ser string";
                }elseif(!is_int($book_insertar->numberOfPages)){
                    http_response_code(405);
                    echo "numberOfPages debe ser numerico";
                } else {
                    for ($i = 0; $i < sizeof($books); $i++) {
                        if ($books[$i]->getId() == $id) {
                            http_response_code(200);
                            $actualizado = true;
                            $nueva = new Book($books[$i]->getId(), $book_insertar->name, $book_insertar->isFamilyFriendly, $book_insertar->isAccessibleForFree, $book_insertar->copyrightYear, $book_insertar->version, $book_insertar->bookEdition, $book_insertar->isbn, $book_insertar->numberOfPages, $book_insertar->abridged);
                            global $books;
                            $books[$i] = $nueva;
                            file_put_contents("data2.json", "");
                            for ($i = 0; $i < sizeof($creativeworks); $i++) {
                                $variableguardar = array('id' => $books[$i]->getId(), 'name' => $books[$i]->getName(), 'isFamilyFriendly' => $books[$i]->getIsFamilyFriendlyguardar(), 'isAccessibleForFree' => $books[$i]->getisAccessibleForFreeguardar(), 'copyrightYear' => $books[$i]->getCopyrightYear(), 'version' => $books[$i]->getVersion(), 'bookEdition' => $books[$i]->getBookEdition(), 'isbn' => $books[$i]->getIsbn(), 'numberOfPages' => $books[$i]->getNumberOfPages(), 'abridged' => $books[$i]->getAbridgedguardar());
                                $jsonguardacreativework = file_get_contents("data2.json");
                                if ($jsonguardacreativework != null) {
                                    file_put_contents("data2.json", "," . json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                                } else {
                                    file_put_contents("data2.json", json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                                }
                            }
                        }
                    }
                    if (!$actualizado) {
                        http_response_code(404);
                        echo "not allowed";
                    }
                }

                break;
            case "POST":
                http_response_code(404);
                echo "POST not allowed over a particular Book";
                break;
            case "DELETE":
                $actualizado = false;
                for ($i = 0; $i < sizeof($books); $i++) {
                    if ($books[$i]->getId() == $id) {
                        $actualizado = true;
                        file_put_contents("data2.json", "");
                        for ($i = 0; $i < sizeof($books); $i++) {
                            if ($books[$i]->getId() != $id) {
                                $variableguardar = array('id' => $books[$i]->getId(), 'name' => $books[$i]->getName(), 'isAccessibleForFree' => $books[$i]->getisAccessibleForFreeguardar(), 'isFamilyFriendly' => $books[$i]->getIsFamilyFriendlyguardar(), 'copyrightYear' => $books[$i]->getCopyrightYear(), 'version' => $books[$i]->getVersion(), 'bookEdition' => $books[$i]->getBookEdition(), 'isbn' => $books[$i]->getIsbn(), 'numberOfPages' => $books[$i]->getNumberOfPages(), 'abridged' => $books[$i]->getAbridgedguardar());
                                $jsonguardabook = file_get_contents("data2.json");
                                if ($jsonguardabook != null) {
                                    file_put_contents("data2.json", "," . json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                                } else {
                                    file_put_contents("data2.json", json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                                }
                            }
                        }
                    }
                }
                if (!$actualizado) {
                    http_response_code(404);
                    echo "not allowed";
                }
                break;
            case "OPTIONS":
                http_response_code(200);
                break;
            default:
                http_response_code(404);
                echo "not allowed";
                break;
        }
    } elseif (strcmp('article', $request) === 0 && $id == null) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                switch ($formato) {
                    case 'application/xml':
                        header('Content-type: application/xml');
                        echo articletoxml();
                        break;
                    case 'application/ld+json':
                        header('Content-type: application/json');
                        echo json_encode(articletojson());
                        break;
                    case 'text/plain':
                        header('Content-type:text/plain');
                        echo articletotext();
                        break;
                    default:
                        header('Content-type: text/html');
                        echo articletohtml();
                        break;
                }
                break;
            case "PUT":
                http_response_code(404);
                echo "PUT not allowed over every Article";
                break;
            case "POST":

                $article_insertar = json_decode(file_get_contents('php://input'));


                if(is_null($article_insertar->name)) {
                    http_response_code(405);
                    echo "name no puede ser nulo";
                } elseif (is_null($article_insertar->copyrightYear)) {
                    http_response_code(405);
                    echo "copyrightYear no puede ser nulo";
                } elseif (is_null($article_insertar->version)) {
                    http_response_code(405);
                    echo "version no puede ser nulo";
                } elseif (is_null($article_insertar->articleSection)) {
                    http_response_code(405);
                    echo "articleSecion no puede ser nulo";
                } elseif (is_null($article_insertar->pagination)) {
                    http_response_code(405);
                    echo "pagination no puede ser nulo";
                } elseif (is_null($article_insertar->wordCount)) {
                    http_response_code(405);
                    echo "wordCount no puede ser nulo";
                } elseif(!is_string($article_insertar->name)){
                    http_response_code(405);
                    echo "name debe ser string";
                }elseif(!is_int($article_insertar->version)){
                    http_response_code(405);
                    echo "version debe ser numerico";
                }elseif(!is_int($article_insertar->copyrightYear)){
                    http_response_code(405);
                    echo "copyrightYear debe ser numerico";
                }elseif(!is_string($article_insertar->articleSection)){
                    http_response_code(405);
                    echo "articleSection debe ser string";
                }elseif(!is_string($article_insertar->pagination)){
                    http_response_code(405);
                    echo "pagination debe ser string";
                }elseif(!is_int($article_insertar->wordCount)){
                    http_response_code(405);
                    echo "wordCount debe ser numerico";
                } else {
                    $idarticle++;
                    $nueva = new Article($idarticle, $article_insertar->name, $article_insertar->isFamilyFriendly, $article_insertar->isAccessibleForFree, $article_insertar->copyrightYear, $article_insertar->version, $article_insertar->articleSection, $article_insertar->pagination, $article_insertar->wordCount);
                    global $articles;
                    $articles[] = $nueva;
                    $variableguardar = array('id' => $nueva->getId(), 'name' => $nueva->getName(), 'isFamilyFriendly' => $nueva->getIsFamilyFriendlyguardar(), 'isAccessibleForFree' => $nueva->getisAccessibleForFreeguardar(), 'copyrightYear' => $nueva->getCopyrightYear(), 'version' => $nueva->getVersion(), 'articleSection' => $nueva->getArticleSection(), 'pagination' => $nueva->getPagination(), 'wordCount' => $nueva->getWordCount());
                    $jsonarticledatas = file_get_contents("data3.json");
                    if ($jsonarticledatas != null) {
                        file_put_contents("data3.json", "," . json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                    } else {
                        file_put_contents("data3.json", json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                    }
                }
                break;
            case "DELETE":
                http_response_code(404);
                echo "DELETE not allowed over every Article";
                break;
            case "OPTIONS":
                http_response_code(200);
                break;
            default:
                http_response_code(404);
                echo "not allowed";
                break;
        }
    } elseif (strcmp('article', $request) === 0 && $id != null) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $actualizado = false;
                for ($i = 0; $i < sizeof($articles); $i++) {
                    if ($articles[$i]->getId() == $id) {
                        echo '{' . '"@context":"http://schema.org","@type":"Article",' . ' "id":' . $id . ', "name":"' . $articles[$i]->getName() . '","isFamilyFriendly":' . $articles[$i]->getIsFamilyFriendly() . ', "isAccessibleForFree":' . $articles[$i]->getisAccessibleForFree() . ', "copyrightYear":' . $articles[$i]->getCopyrightYear() . ', "version":' . $articles[$i]->getVersion() . ', "articleSection":"' . $articles[$i]->getArticleSection() . '", "pagination":"' . $articles[$i]->getPagination() . '", "wordCount":' . $articles[$i]->getWordCount() . ' }';
                        $actualizado = true;
                    }
                }
                if (!$actualizado) {
                    http_response_code(404);
                    echo "not allowed";
                }
                break;
            case "PUT":
                $actualizado = false;
                $article_insertar = json_decode(file_get_contents('php://input'));

                if(is_null($article_insertar->name)) {
                    http_response_code(405);
                    echo "name no puede ser nulo";
                } elseif (is_null($article_insertar->copyrightYear)) {
                    http_response_code(405);
                    echo "copyrightYear no puede ser nulo";
                } elseif (is_null($article_insertar->version)) {
                    http_response_code(405);
                    echo "version no puede ser nulo";
                } elseif (is_null($article_insertar->articleSection)) {
                    http_response_code(405);
                    echo "articleSecion no puede ser nulo";
                } elseif (is_null($article_insertar->pagination)) {
                    http_response_code(405);
                    echo "pagination no puede ser nulo";
                } elseif (is_null($article_insertar->wordCount)) {
                    http_response_code(405);
                    echo "wordCount no puede ser nulo";
                } elseif(!is_string($article_insertar->name)){
                    http_response_code(405);
                    echo "name debe ser string";
                }elseif(!is_int($article_insertar->version)){
                    http_response_code(405);
                    echo "version debe ser numerico";
                }elseif(!is_int($article_insertar->copyrightYear)){
                    http_response_code(405);
                    echo "copyrightYear debe ser numerico";
                }elseif(!is_string($article_insertar->articleSection)){
                    http_response_code(405);
                    echo "articleSection debe ser string";
                }elseif(!is_string($article_insertar->pagination)){
                    http_response_code(405);
                    echo "pagination debe ser string";
                }elseif(!is_int($article_insertar->wordCount)){
                    http_response_code(405);
                    echo "wordCount debe ser numerico";
                } else {
                    for ($i = 0; $i < sizeof($articles); $i++) {
                        if ($articles[$i]->getId() == $id) {
                            $actualizado = true;
                            $nueva = new Article($articles[$i]->getId(), $article_insertar->name, $article_insertar->isFamilyFriendly, $article_insertar->isAccessibleForFree, $article_insertar->copyrightYear, $article_insertar->version, $article_insertar->articleSection, $article_insertar->pagination, $article_insertar->wordCount);
                            global $articles;
                            $articles[$i] = $nueva;
                            file_put_contents("data3.json", "");
                            for ($i = 0; $i < sizeof($articles); $i++) {
                                $variableguardar = array('id' => $articles[$i]->getId(), 'name' => $articles[$i]->getName(), 'isFamilyFriendly' => $articles[$i]->getIsFamilyFriendlyguardar(), 'isAccessibleForFree' => $articles[$i]->getisAccessibleForFreeguardar(), 'copyrightYear' => $articles[$i]->getCopyrightYear(), 'version' => $articles[$i]->getVersion(), 'articleSection' => $articles[$i]->getArticleSection(), 'pagination' => $articles[$i]->getPagination(), 'wordCount' => $articles[$i]->getWordCount());
                                $jsonguardacreativework = file_get_contents("data3.json");
                                if ($jsonguardacreativework != null) {
                                    file_put_contents("data3.json", "," . json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                                } else {
                                    file_put_contents("data3.json", json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                                }
                            }
                        }
                    }
                    if (!$actualizado) {
                        http_response_code(404);
                        echo "not allowed";
                    }

                }
                break;
            case "POST":
                http_response_code(404);
                echo "POST not allowed over a particular Article";
                break;
            case "DELETE":
                $actualizado = false;
                for ($i = 0; $i < sizeof($articles); $i++) {
                    if ($articles[$i]->getId() == $id) {
                        $actualizado = true;
                        file_put_contents("data3.json", "");
                        for ($i = 0; $i < sizeof($articles); $i++) {
                            if ($articles[$i]->getId() != $id) {
                                $variableguardar = array('id' => $articles[$i]->getId(), 'name' => $articles[$i]->getName(), 'isAccessibleForFree' => $articles[$i]->getisAccessibleForFreeguardar(), 'isFamilyFriendly' => $articles[$i]->getIsFamilyFriendlyguardar(), 'copyrightYear' => $articles[$i]->getCopyrightYear(), 'version' => $articles[$i]->getVersion(), 'articleSection' => $articles[$i]->getArticleSection(), 'pagination' => $articles[$i]->getPagination(), 'wordCount' => $articles[$i]->getWordCount());
                                $jsonguardaarticle = file_get_contents("data3.json");
                                if ($jsonguardaarticle != null) {
                                    file_put_contents("data3.json", "," . json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                                } else {
                                    file_put_contents("data3.json", json_encode($variableguardar, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                                }
                            }
                        }
                    }
                }
                if (!$actualizado) {
                    http_response_code(404);
                    echo "not allowed";
                }

                break;
            case "OPTIONS":
                http_response_code(200);
                break;
            default:
                http_response_code(404);
                echo "not allowed";
                break;

        }
    } else {
        http_response_code(404);
        echo "not allowed";
    }
}catch(Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}

?>
