"use client";

function CustomCodeRenderer({ data }: any) {
  data;

  return (
    <pre className="bg-gray-700 rounded-md p-4 break-words ">
      <code className="text-gray-100 text-sm whitespace-pre-wrap ">
        {data.code}
      </code>
    </pre>
  );
}

export default CustomCodeRenderer;
