<?php

namespace Sample\Repository;

use Closure;
use PDO;

abstract class BaseRepository
{
    protected $pdo;

    protected $types;

    protected $table;

    protected $primary_key = 'id';

    public function __construct(array $config)
    {
        $this->pdo = new PDO("${config['driver']}:dbname=${config['database']} host=${config['host']} port=${config['port']}", $config['user'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        $this->types  = [
            gettype('string') => PDO::PARAM_STR,
            gettype(199) => PDO::PARAM_INT,
        ];
    }

    public function insert($fields)
    {
        unset($fields[$this->primary_key]);
        $field_names = array_keys($fields);

        $statement = $this->pdo->prepare('INSERT INTO ' . $this->table . '(' . implode(',', $field_names) . ') VALUES(:' . implode(', :', $field_names) . ')');
        foreach ($fields as $name => $value) {
            $statement->bindValue($name, $value, $this->types[gettype($value)]);
        }
        $statement->execute();
        return $this->pdo->lastInsertId($this->table . '_' . $this->primary_key . '_seq');
    }

    public function findByPrimaryKey($value)
    {
        $statement = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE {$this->primary_key} = :{$this->primary_key}");
        $statement->bindValue($this->primary_key, $value, PDO::PARAM_INT);
        $statement->execute();
        $array = $statement->fetch();
        return $this->createDomain($array);
    }

    abstract protected function createDomain(array $array);

    public function transaction(Closure $closure)
    {
        $this->pdo->beginTransaction();
        try {
            $result = $closure();
            $this->pdo->commit();
            return $result;
        } catch (Exception $e) {
            $this->pdo->rollback();
            throw $e;
        }
    }
}
