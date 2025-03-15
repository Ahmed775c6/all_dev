import { useEffect, useState } from 'react';
import { EnvelopeIcon, PhoneIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const BoxMail = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const fetchRR = async () => {
      try {
        const response = await axios.get(`${baseUrl}/repportsgx`);

        const sortedMessages = response.data.r.sort((a: any, b: any) => {
          const dateA = new Date(a.date.split(' at ').join(' '));
          const dateB = new Date(b.date.split(' at ').join(' '));
          return dateB.getTime() - dateA.getTime();
        });
     
        setMessages(sortedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchRR();
  }, []);

  const filteredMessages = messages.filter((message: any) => {
    const matchesSearch = message?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message?.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = selectedDate ? 
      new Date(message.date.split(' at ').join(' ')).toISOString().split('T')[0] === selectedDate :
      true;

    return matchesSearch && matchesDate;
  });

  const handleReply = (message: any) => {
    setSelectedMessage(message);
    setShowReplyModal(true);
  };

  const sendReply = async (e:any) => {
    e.preventDefault();
    try {
      // Update the message with reply
      const updatedMessage = {
        reply: replyContent,
        replyDate: new Date().toLocaleString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      };

      // Update backend
      await axios.post(`${baseUrl}/repportsgxReplay/${selectedMessage._id}`, updatedMessage);

      // Update local state
      messages.filter((msg)=> msg._id === selectedMessage._id ? msg.Replay.push(updatedMessage) : '')
  

      setShowReplyModal(false);
      setReplyContent('');
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700 p-8">
      {/* Reply Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 max-w-full w-full bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold dark:text-white">
                Reply to {selectedMessage?.name}
              </h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={sendReply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                  To: {selectedMessage?.email}
                </label>
              </div>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={6}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-3 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
                placeholder="Type your reply here..."
              />
              <div className="flex justify-end gap-3">
                <button
                type='button'
                  onClick={() => setShowReplyModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button type='submit'
                 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex ozlx  gap-8">
          {/* Messages List */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 ras">
                <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                  <EnvelopeIcon className="h-6 w-6 text-blue-500" />
                  Received Messages
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full sm:w-48 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No messages found
                  </div>
                ) : (
                  filteredMessages.map((message: any) => (
                    <div 
                      key={message._id}
                      className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <UserCircleIcon className={`h-10 w-10 ze ${
                            message.Replay ? 'text-green-500' : 'text-gray-400 dark:text-gray-300'
                          }`} />
                        </div>
                        
                        <div className="flex-1 flex-col">
                          <div className="flex flex-col justify-between mb-2">
                            <h3 className="font-semibold dark:text-white">
                              {message.name}
                        
                            </h3>
                                  <span className="text-[11px] text-blue-500 dark:text-blue-400 ">
                                {message.email}
                              </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {message.date}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {message.message}
                          </p>

                          {(
                     message?.Replay?.map((item : any, index : any)=>(
                        <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" key={`t-${index}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Your reply
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {item.replyDate}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {item.reply}
                        </p>
                      </div>
                     ))
                          )}
                          
                          <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleReply(message)}
                              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 text-sm"
                              disabled={message.replied}
                            >
                              {message.replied ? 'Replied' : 'Reply'}
                            </button>
                      
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="md:w-80">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center gap-2">
                Contact Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <PhoneIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="dark:text-white">+216 551 15856</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="dark:text-white">contact@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxMail;