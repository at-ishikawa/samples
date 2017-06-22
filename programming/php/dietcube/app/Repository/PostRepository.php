<?php

namespace Sample\Repository;

use PDO;
use Sample\Domain\Post;

class PostRepository extends BaseRepository
{
    protected $table = 'post';

    protected $pdo;

    public function create(Post $post)
    {
        $id = $this->insert($post->getFields());
        return $this->findByPrimaryKey($id);
    }

    protected function createDomain(array $record)
    {
        return new Post($record);
    }
}
