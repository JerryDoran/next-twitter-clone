import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useSession, signOut } from 'next-auth/react';
import { useRef, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../firebase.config';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

export default function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const filePickerRef = useRef(null);

  async function sendPost() {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      text: input,
      userImg: session.user.image,
      name: session.user.name,
      username: session.user.username,
      timestamp: serverTimestamp(),
    });

    // storage
    const imageRef = ref(storage, `posts/${docRef.id}/images`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput('');
    setSelectedFile(null);
    setLoading(false);
  }

  function addImageToPost(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  }

  return (
    <>
      {session && (
        <div className='flex border-b dark:border-gray-700 p-3 space-x-3'>
          <img
            src={session.user.image}
            alt='user-image'
            className='h-10 w-10 rounded-full cursor-pointer hover:brightness-95'
            onClick={signOut}
          />
          <div className='w-full divide-y dark:divide-gray-700'>
            <div className=''>
              <textarea
                rows='2'
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='bg-transparent w-full border-none focus:ring-0 placeholder-gray-500 tracking-wide min-h-[50px]'
              ></textarea>
            </div>
            {selectedFile && (
              <div className='relative'>
                <XIcon
                  onClick={() => setSelectedFile(null)}
                  className='h-7 absolute text-white z-10 cursor-pointer shadow-md shadow-white rounded-full'
                />
                <img
                  src={selectedFile}
                  alt='post pic'
                  className={`brightness-50 w-full object-cover ${
                    loading && 'animate-pulse'
                  }`}
                />
              </div>
            )}
            <div className='flex items-center justify-between pt-2.5'>
              {!loading && (
                <>
                  <div className='flex'>
                    <div
                      className=''
                      onClick={() => filePickerRef.current.click()}
                    >
                      <PhotographIcon className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 hoverEffect' />
                      <input
                        type='file'
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <EmojiHappyIcon className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 hoverEffect' />
                  </div>
                  <button
                    className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-90 disabled:opacity-50'
                    disabled={!input.trim()}
                    onClick={sendPost}
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
