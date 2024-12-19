'use client';

import { useState } from 'react';
import movieDatabaseJSON from '@/lib/movie-data.json';
import MovieCalendar from '@/components/MovieCalendar';
import { MovieDatabase } from '@/types/movie';

// Then use the type for your movieDatabase
const movieDatabase: MovieDatabase = movieDatabaseJSON;

export default function Home() {
  const projectName = 'Marcus Movie Day';
  const [loading, setLoading] = useState(false);

  // Pre-generate dates
  const availableDates = Object.keys(movieDatabase);
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const [movies, setMovies] = useState(movieDatabase[selectedDate] || []);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    const newDate = event.target.value;
    setSelectedDate(newDate);
    
    // Simulate loading
    setTimeout(() => {
      setMovies(movieDatabase[newDate] || []);
      setLoading(false);
    }, 250);
  };

  return (
    <main className="min-h-screen bg-[#f5f7fa] p-8">
      <div className="container mx-auto max-w-[1200px]">
        <h1 className="text-3xl font-bold mb-8 text-center">{projectName}</h1>
        
        <div className="text-center mb-8">
          <label htmlFor="date">Select Date:</label>
          <select 
            value={selectedDate} 
            onChange={handleDateChange}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          >
            {Object.keys(movieDatabase).map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>

        {/* Add Calendar View */}
        <MovieCalendar 
          selectedDate={selectedDate}
          movies={movies}
        />

        {/* Existing movie cards */}
        <div className="calendar-view bg-white rounded-lg shadow-lg p-6">
          {loading ? (
            <div className="text-center p-8 text-gray">Loading movies...</div>
          ) : movies.length === 0 ? (
            <p>No movies found for selected date. Please choose a different date.</p>
          ) : (
            <>       
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {movies.map((movie, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                    {movie.poster && (
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="w-full h-auto object-contain rounded"
                      />
                    )}
                    <h2 className="text-[#0a0a0a] text-lg my-4">{movie.title}</h2>
                    <div className="screenings">
                      {movie.screenings.map((screening, idx) => (
                        <div key={idx} className="mb-4">
                          <p className="font-medium">{screening.screen}</p>
                          <div className="flex flex-wrap gap-2">
                            {screening.times.map((time, timeIdx) => (
                              <span 
                                key={timeIdx}
                                className="bg-[#e9ecef] px-3 py-1 rounded text-sm"
                              >
                                {time}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}