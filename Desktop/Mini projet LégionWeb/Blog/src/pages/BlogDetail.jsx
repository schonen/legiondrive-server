import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${id}/`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <p className="text-center py-20">Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">{post.title}</h1>
        {post.image && (
          <img
            src={`http://localhost:8000${post.image}`}
            alt={post.title}
            className="w-full h-auto mb-6 rounded-lg"
          />
        )}
        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">{post.content}</p>

        <div className="mt-8 flex gap-4">
          <Link
            to={`/edit/${post.id}`}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Modifier
          </Link>
          <Link
            to="/"
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Retour
          </Link>
        </div>
      </div>
    </div>
  );
}
