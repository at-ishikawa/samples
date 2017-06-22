<?php
/**
 *
 */

namespace Sample\Controller\Blog;

use Dietcube\Controller;
use Sample\Domain\Post;

class TopController extends Controller
{
    public function index()
    {
        $_SESSION['session'] = $this->query('session') ?? null;
        return $this->render('blog/index', [
            'session' => $_SESSION['session'],
        ]);
    }

    public function create()
    {
        $post_array = $this->body();
        $post = new Post($post_array);
        $post_repository = $this->get('repository.post');
        $created_post = $post_repository->transaction(function () use ($post_repository, $post) {
            return $post_repository->create($post);
        });
        return $this->redirect("blog/{$created_post->id}");
    }

    public function show($id)
    {
        $post_repository = $this->get('repository.post');
        $post = $post_repository->findByPrimaryKey($id);
        return $this->render('blog/show', [
            'post' => $post->toArray(),
        ]);
    }
}
