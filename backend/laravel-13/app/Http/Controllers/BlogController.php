<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use App\Models\Blogs\Blog;
use App\Models\User;
use App\Http\Resources\BlogResource;

class BlogController extends Controller
{
    protected function user(): User
    {
        return Auth::user();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = $this->user()->blogs()->latest()->paginate(2);

        return BlogResource::collection($blogs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated_data = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'body' => ['required', 'string']
        ]);

        $validated_data['slug'] = Str::slug($validated_data['title']);

        $this->user()->blogs()->create($validated_data);

        return response()->json([
            'status' => 'success',
            'message' => 'Blog created successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        //
    }
}
