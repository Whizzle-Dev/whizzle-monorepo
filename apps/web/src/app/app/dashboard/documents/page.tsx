'use client';

import React, { Suspense, useEffect } from 'react';
import { withAuth } from '@/domain/auth/withAuth';

import { PlateEditor } from '@/domain/documents/editor';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import {
  GetDocumentsDocument,
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
  useGetDocumentsQuery,
  useMentionEmployeeMutation,
  useUpdateDocumentMutation,
} from '@/generated';
import { useDebouncedCallback } from 'use-debounce';
import { NetworkStatus } from '@apollo/client';
import { Loader } from '@/components/ui/loader';
import { Input } from '@/components/ui/input';
import { DocumentItem } from '@/domain/documents/DocumentItem';
import { initialContent } from '@/domain/documents/utils';
import { parseAsInteger, useQueryState } from 'nuqs';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { KnowledgeBaseToolBarButtons } from '@/components/plate-ui/toolbar-buttons';
import { Editor } from '@/components/plate-ui/editor';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import { MentionEmployees } from '@/components/plate-ui/mention-employees';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useSearchParams } from 'next/navigation';

const DocumentsPages = () => {
  const [sort, setSort] = React.useState<'asc' | 'desc'>('asc');
  const {
    data: currentData,
    networkStatus,
    previousData,
  } = useGetDocumentsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    variables: {
      sort,
    },
  });

  const searchParams = useSearchParams();
  const data = currentData ?? previousData;
  const [create] = useCreateDocumentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [GetDocumentsDocument],
  });
  const [update] = useUpdateDocumentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [GetDocumentsDocument],
  });

  const [deleteDocument] = useDeleteDocumentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [GetDocumentsDocument],
  });

  const [documentId, setDocumentId] = useQueryState<number>(
    'id',
    parseAsInteger,
  );

  useEffect(() => {
    if (!documentId && data?.documents[0]) {
      setDocumentId(data?.documents[0].id);
    }
  }, [documentId, data]);

  const selectedDocument =
    data?.documents.find((doc) => doc.id === documentId) ||
    data?.myDocuments.find((doc) => doc.id === documentId);
  const handleContentChange = (content: any) => {
    console.log({ content, selectedDocument });
    if (selectedDocument) {
      update({
        variables: {
          input: {
            content: JSON.stringify(content),
            name: selectedDocument.name,
          },
          id: selectedDocument.id,
        },
      });
    }
  };

  const onChange = useDebouncedCallback(handleContentChange, 2000);

  const [mentionEmployee] = useMentionEmployeeMutation();

  const onMention = (mentionedEmployeeId: number) => {
    const params = new URLSearchParams(window.location.search);
    const documentId = params.get('id');
    documentId &&
      mentionEmployee({
        variables: {
          documentId: Number(documentId),
          employeeId: mentionedEmployeeId,
        },
      });
  };

  return (
    <div className="flex flex-row">
      <div className="w-[300px] h-full flex flex-col mr-6 sticky top-4">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-4">
            <span className="font-bold text-xl">Knowledge Base </span>
            {networkStatus === NetworkStatus.loading && <Loader />}
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setSort(sort === 'asc' ? 'desc' : 'asc');
            }}
          >
            {sort === 'asc' ? (
              <Icons.SortDesc size={16} />
            ) : (
              <Icons.SortAsc size={16} />
            )}
          </Button>
        </div>
        <Accordion
          type="multiple"
          defaultValue={['my', 'company']}
          className="w-[300px]"
        >
          <AccordionItem value="my">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                My Space <Icons.Lock size={18} />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {data?.myDocuments?.length === 0 && (
                  <div className="text-gray-500 text-center">
                    No documents found
                  </div>
                )}
                {data?.myDocuments?.map((item) => (
                  <DocumentItem
                    selected={selectedDocument?.id === item.id}
                    key={item.id}
                    icon={null}
                    name={item.name}
                    onClick={() => {
                      setDocumentId(item.id);
                    }}
                    handleDelete={() => {
                      deleteDocument({
                        variables: {
                          id: item.id,
                        },
                      }).then(() => {
                        if (selectedDocument?.id === item.id) {
                          setDocumentId(null);
                        }
                      });
                    }}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="company">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                Company Space <Icons.Building2 size={18} />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {data?.documents?.length === 0 && (
                  <div className="text-gray-500 text-center">
                    No documents found
                  </div>
                )}
                {data?.documents?.map((item) => (
                  <DocumentItem
                    selected={selectedDocument?.id === item.id}
                    key={item.id}
                    icon={null}
                    name={item.name}
                    onClick={() => {
                      setDocumentId(item.id);
                    }}
                    handleDelete={() => {
                      deleteDocument({
                        variables: {
                          id: item.id,
                        },
                      }).then(() => {
                        if (selectedDocument?.id === item.id) {
                          setDocumentId(null);
                        }
                      });
                    }}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Popover>
          <PopoverTrigger asChild>
            <Button className="w-fit gap-2 mt-8" size="sm" type="button">
              <Icons.PlusIcon size={14} /> New Document
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 p-4">
              <Button
                type="button"
                variant="secondary"
                className="gap-2"
                size="sm"
                onClick={() => {
                  create({
                    variables: {
                      input: {
                        name: 'Untitled Document',
                        content: JSON.stringify(initialContent),
                        icon: null,
                        isPrivate: true,
                      },
                    },
                  }).then((response) => {
                    if (response.data?.createDocument) {
                      setDocumentId(response.data.createDocument.id);
                    }
                  });
                }}
              >
                <Icons.Lock size={14} /> Private Document
              </Button>
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                size="sm"
                onClick={() => {
                  create({
                    variables: {
                      input: {
                        name: 'Untitled Document',
                        content: JSON.stringify(initialContent),
                        icon: null,
                        isPrivate: false,
                      },
                    },
                  }).then((response) => {
                    if (response.data?.createDocument) {
                      setDocumentId(response.data.createDocument.id);
                    }
                  });
                }}
              >
                <Icons.Building2 size={14} /> Company Document
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {selectedDocument && (
        <div className="w-full max-w-screen-lg">
          <div className="flex flex-row gap-2">
            <Input
              key={selectedDocument.id}
              autoFocus
              placeholder="Document title"
              className="mb-2"
              onBlur={(e) => {
                const name = e.target.value;
                update({
                  variables: {
                    input: {
                      name,
                      content: JSON.stringify(selectedDocument.content),
                    },
                    id: selectedDocument.id,
                  },
                });
              }}
              defaultValue={selectedDocument.name}
            />
          </div>
          <PlateEditor
            key={selectedDocument.id}
            content={selectedDocument.content}
            onChange={onChange}
          >
            <FixedToolbar className="z-[9999]">
              <KnowledgeBaseToolBarButtons />
            </FixedToolbar>

            <Editor
              variant="outline"
              className="min-h-screen"
              placeholder="Start typing here..."
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>
            <CommentsPopover />
            <MentionEmployees onMention={onMention} />
          </PlateEditor>
        </div>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <DocumentsPages />
    </Suspense>
  );
};
export default withAuth(Page);
