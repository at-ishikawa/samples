<?php

namespace Sample\Domain;

class Post extends BaseDomain
{
    protected $id;

    protected $title;

    protected $content;

    protected $session;

    public function __construct(array $array)
    {
        parent::__construct($array);
        if (isset($_SESSION['session'])) {
            $this->session = (int)$_SESSION['session'];
        }
    }

    public function getFields()
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'session' => $this->session,
        ];
    }
}
