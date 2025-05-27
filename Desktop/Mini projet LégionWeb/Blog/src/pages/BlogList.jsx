import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  // Charger les articles
  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/posts/');
      setPosts(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des articles', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Supprimer un article
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet article ?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}/`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de l'article", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Articles</h1>

        <div className="flex justify-end mb-6">
          <Link
            to="/new"
            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
          >
            + Ajouter un article
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600">Aucun article disponible.</p>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <div
                key={post.id}
                className="bg-gray-50 rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-lg transition"
              >
                <img
                  src={`http://localhost:8000${post.image}`}
                  alt={post.title}
                  className="rounded-md object-cover h-24 w-24"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-indigo-700">
                    <Link to={`/post/${post.id}`} className="hover:underline">{post.title}</Link>
                  </h2>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/edit/${post.id}`}
                    className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
